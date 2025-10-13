import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { StockMovementService } from '../inventory/stock-movement.service';
import { QueueService } from '../queue/queue.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
    private cacheService: CacheService,
    private stockMovementService: StockMovementService,
    private queueService: QueueService,
  ) {}

  async getCart(cartId: string, customerId?: string) {
    const where: any = { id: cartId };
    if (customerId) where.customerId = customerId;

    const cart = await this.prisma.cart.findUnique({
      where,
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: {
                    brand: true,
                    media: {
                      take: 1,
                      orderBy: { position: 'asc' },
                    },
                  },
                },
                inventoryLevels: {
                  include: {
                    warehouse: true,
                  },
                },
              },
            },
          },
        },
        customer: true,
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // Calculate totals and check availability
    const items = await Promise.all(
      cart.items.map(async (item) => {
        const totalStock = item.variant.inventoryLevels.reduce(
          (sum, level) => sum + (level.onHand - level.reserved),
          0
        );

        return {
          ...item,
          available: totalStock,
          inStock: totalStock >= item.quantity,
          subtotal: Number(item.price) * item.quantity,
        };
      })
    );

    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      ...cart,
      items,
      subtotal,
      totalItems,
      hasOutOfStockItems: items.some(item => !item.inStock),
    };
  }

  async addToCart(addToCartDto: AddToCartDto, customerId?: string) {
    const { variantId, quantity, sessionId } = addToCartDto;

    // Get variant with inventory
    const variant = await this.prisma.variant.findUnique({
      where: { id: variantId },
      include: {
        product: true,
        inventoryLevels: {
          include: {
            warehouse: true,
          },
        },
      },
    });

    if (!variant || !variant.published) {
      throw new NotFoundException('Product variant not found');
    }

    // Check stock availability
    const totalStock = variant.inventoryLevels.reduce(
      (sum, level) => sum + (level.onHand - level.reserved),
      0
    );

    if (totalStock < quantity) {
      throw new BadRequestException(`Only ${totalStock} items available`);
    }

    // Find or create cart
    let cart = await this.findOrCreateCart(customerId, sessionId);

    // Check if item already exists in cart
    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        variantId,
      },
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      
      if (totalStock < newQuantity) {
        throw new BadRequestException(`Only ${totalStock} items available`);
      }

      // Update existing item
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: newQuantity,
          price: variant.price,
        },
      });

      // Update stock reservation
      if (existingItem.reserved) {
        await this.updateStockReservation(
          variantId,
          variant.inventoryLevels[0]?.warehouseId,
          quantity,
          cart.id
        );
      }
    } else {
      // Create new cart item
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          variantId,
          quantity,
          price: variant.price,
        },
      });
    }

    // Reserve stock
    await this.reserveStock(variantId, quantity, cart.id);

    // Schedule abandoned cart email if customer exists
    if (customerId) {
      await this.queueService.sendAbandonedCartEmail(cart.id);
    }

    return this.getCart(cart.id, customerId);
  }

  async updateCartItem(cartId: string, itemId: string, updateDto: UpdateCartItemDto, customerId?: string) {
    const { quantity } = updateDto;

    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: {
          id: cartId,
          customerId: customerId || undefined,
        },
      },
      include: {
        variant: {
          include: {
            inventoryLevels: true,
          },
        },
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (quantity <= 0) {
      return this.removeFromCart(cartId, itemId, customerId);
    }

    // Check stock availability
    const totalStock = cartItem.variant.inventoryLevels.reduce(
      (sum, level) => sum + (level.onHand - level.reserved),
      0
    );

    if (totalStock < quantity) {
      throw new BadRequestException(`Only ${totalStock} items available`);
    }

    // Update quantity
    await this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    // Update stock reservation
    const quantityDiff = quantity - cartItem.quantity;
    if (quantityDiff !== 0 && cartItem.reserved) {
      await this.updateStockReservation(
        cartItem.variantId,
        cartItem.variant.inventoryLevels[0]?.warehouseId,
        quantityDiff,
        cartId
      );
    }

    return this.getCart(cartId, customerId);
  }

  async removeFromCart(cartId: string, itemId: string, customerId?: string) {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: {
          id: cartId,
          customerId: customerId || undefined,
        },
      },
      include: {
        variant: {
          include: {
            inventoryLevels: true,
          },
        },
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    // Unreserve stock
    if (cartItem.reserved) {
      await this.unreserveStock(
        cartItem.variantId,
        cartItem.variant.inventoryLevels[0]?.warehouseId,
        cartItem.quantity,
        cartId
      );
    }

    // Remove item
    await this.prisma.cartItem.delete({
      where: { id: itemId },
    });

    return this.getCart(cartId, customerId);
  }

  async clearCart(cartId: string, customerId?: string) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        id: cartId,
        customerId: customerId || undefined,
      },
      include: {
        items: {
          include: {
            variant: {
              include: {
                inventoryLevels: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // Unreserve all stock
    for (const item of cart.items) {
      if (item.reserved) {
        await this.unreserveStock(
          item.variantId,
          item.variant.inventoryLevels[0]?.warehouseId,
          item.quantity,
          cartId
        );
      }
    }

    // Clear all items
    await this.prisma.cartItem.deleteMany({
      where: { cartId },
    });

    return { message: 'Cart cleared successfully' };
  }

  private async findOrCreateCart(customerId?: string, sessionId?: string) {
    let cart = null;

    if (customerId) {
      cart = await this.prisma.cart.findFirst({
        where: {
          customerId,
          expiresAt: { gt: new Date() },
        },
      });
    } else if (sessionId) {
      cart = await this.prisma.cart.findFirst({
        where: {
          sessionId,
          expiresAt: { gt: new Date() },
        },
      });
    }

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          customerId,
          sessionId,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      });
    }

    return cart;
  }

  private async reserveStock(variantId: string, quantity: number, cartId: string) {
    // Find warehouse with available stock
    const inventoryLevels = await this.prisma.inventoryLevel.findMany({
      where: {
        variantId,
        onHand: { gt: 0 },
      },
      include: {
        warehouse: true,
      },
      orderBy: {
        onHand: 'desc',
      },
    });

    if (inventoryLevels.length === 0) {
      throw new BadRequestException('No stock available');
    }

    // Reserve from the warehouse with most stock
    const warehouseId = inventoryLevels[0].warehouseId;
    
    await this.stockMovementService.reserveStock(variantId, warehouseId, quantity, cartId);
    
    // Cache reservation for expiration tracking
    await this.cacheService.reserveStock(variantId, warehouseId, quantity, cartId);

    // Schedule unreserve job
    await this.queueService.scheduleStockUnreserve({
      variantId,
      warehouseId,
      quantity,
      cartId,
    });

    // Mark cart item as reserved
    await this.prisma.cartItem.updateMany({
      where: {
        cartId,
        variantId,
      },
      data: {
        reserved: true,
        reservedAt: new Date(),
      },
    });
  }

  private async unreserveStock(variantId: string, warehouseId: string, quantity: number, cartId: string) {
    await this.stockMovementService.unreserveStock(variantId, warehouseId, quantity, cartId);
    await this.cacheService.unreserveStock(variantId, warehouseId, cartId);
  }

  private async updateStockReservation(variantId: string, warehouseId: string, quantityDiff: number, cartId: string) {
    if (quantityDiff > 0) {
      await this.reserveStock(variantId, quantityDiff, cartId);
    } else if (quantityDiff < 0) {
      await this.unreserveStock(variantId, warehouseId, Math.abs(quantityDiff), cartId);
    }
  }
}
