import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StockMovementService } from '../inventory/stock-movement.service';
import { QueueService } from '../queue/queue.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus, PaymentStatus, FulfillmentStatus, StockMoveType } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private stockMovementService: StockMovementService,
    private queueService: QueueService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { cartId, shippingAddress, billingAddress, paymentMethod, customerId } = createOrderDto;

    // Get cart with items
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true,
                inventoryLevels: true,
              },
            },
          },
        },
        customer: true,
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty or not found');
    }

    // Validate stock availability
    for (const item of cart.items) {
      const totalStock = item.variant.inventoryLevels.reduce(
        (sum, level) => sum + (level.onHand - level.reserved),
        0
      );
      
      if (totalStock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for ${item.variant.product.name}. Available: ${totalStock}, Requested: ${item.quantity}`
        );
      }
    }

    // Calculate totals
    const subtotal = cart.items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
    const tax = subtotal * 0.15; // 15% VAT
    const shipping = this.calculateShipping(subtotal, shippingAddress);
    const total = subtotal + tax + shipping;

    // Generate order number
    const orderNumber = await this.generateOrderNumber();

    // Create order
    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        customerId: customerId || cart.customerId,
        status: OrderStatus.PENDING,
        paymentStatus: PaymentStatus.UNPAID,
        fulfillmentStatus: FulfillmentStatus.UNFULFILLED,
        subtotal,
        tax,
        shipping,
        total,
        shippingAddress,
        billingAddress,
        paymentMethod,
        items: {
          create: cart.items.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
            costSnapshot: item.variant.cost,
          })),
        },
      },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: {
                    brand: true,
                  },
                },
              },
            },
          },
        },
        customer: true,
      },
    });

    // Clear cart after successful order creation
    await this.prisma.cartItem.deleteMany({
      where: { cartId },
    });

    // Queue payment processing
    await this.queueService.processOrderPayment(order.id);

    return order;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    customerId?: string;
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
    fulfillmentStatus?: FulfillmentStatus;
    from?: Date;
    to?: Date;
  }) {
    const { skip, take, customerId, status, paymentStatus, fulfillmentStatus, from, to } = params;

    const where: any = {};
    if (customerId) where.customerId = customerId;
    if (status) where.status = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;
    if (fulfillmentStatus) where.fulfillmentStatus = fulfillmentStatus;
    if (from || to) {
      where.placedAt = {};
      if (from) where.placedAt.gte = from;
      if (to) where.placedAt.lte = to;
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: {
                    include: {
                      brand: true,
                    },
                  },
                },
              },
            },
          },
          customer: true,
          shipments: true,
        },
        orderBy: { placedAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.order.count({ where }),
    ]);

    return { orders, total };
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
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
              },
            },
          },
        },
        customer: true,
        shipments: true,
        payments: true,
        rmas: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async findByOrderNumber(orderNumber: string) {
    const order = await this.prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: {
                    brand: true,
                  },
                },
              },
            },
          },
        },
        customer: true,
        shipments: true,
        payments: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.prisma.order.update({
      where: { id },
      data: {
        ...updateOrderDto,
        updatedAt: new Date(),
      },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
        customer: true,
      },
    });
  }

  async markAsPaid(orderId: string, paymentData: any) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
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

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Update order status
    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: PaymentStatus.PAID,
        paidAt: new Date(),
        status: OrderStatus.PAID,
      },
    });

    // Create payment record
    await this.prisma.payment.create({
      data: {
        orderId,
        provider: paymentData.provider,
        method: paymentData.method,
        amount: order.total,
        currency: order.currency,
        status: 'succeeded',
        transactionId: paymentData.transactionId,
        metadata: paymentData.metadata,
      },
    });

    // Issue stock for each item
    for (const item of order.items) {
      const warehouse = item.variant.inventoryLevels[0]?.warehouseId;
      if (warehouse) {
        await this.stockMovementService.createMovement({
          variantId: item.variantId,
          warehouseId: warehouse,
          type: StockMoveType.ISSUE_SALE,
          quantity: item.quantity,
          unitCost: Number(item.costSnapshot || item.variant.cost),
          referenceType: 'ORDER',
          referenceId: orderId,
          reasonCode: 'SALE',
          notes: `Sale for order ${order.orderNumber}`,
        });
      }
    }

    // Queue fulfillment
    await this.queueService.fulfillOrder(orderId);

    // Send order confirmation
    await this.queueService.sendOrderConfirmation(orderId);

    return this.findOne(orderId);
  }

  async fulfill(orderId: string, fulfillmentData: {
    carrier?: string;
    trackingNo?: string;
    items: Array<{ variantId: string; quantity: number }>;
  }) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Create shipment
    const shipment = await this.prisma.shipment.create({
      data: {
        orderId,
        carrier: fulfillmentData.carrier,
        trackingNo: fulfillmentData.trackingNo,
        status: 'shipped',
        items: fulfillmentData.items,
        shippedAt: new Date(),
      },
    });

    // Check if order is fully fulfilled
    const totalOrderItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalShippedItems = fulfillmentData.items.reduce((sum, item) => sum + item.quantity, 0);

    const fulfillmentStatus = totalShippedItems >= totalOrderItems 
      ? FulfillmentStatus.FULFILLED 
      : FulfillmentStatus.PARTIAL;

    // Update order status
    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        fulfillmentStatus,
        fulfilledAt: fulfillmentStatus === FulfillmentStatus.FULFILLED ? new Date() : undefined,
        status: fulfillmentStatus === FulfillmentStatus.FULFILLED ? OrderStatus.FULFILLED : OrderStatus.PAID,
      },
    });

    return { shipment, fulfillmentStatus };
  }

  async cancel(orderId: string, reason: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
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

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status === OrderStatus.FULFILLED) {
      throw new BadRequestException('Cannot cancel fulfilled order');
    }

    // If order was paid, reverse stock movements
    if (order.paymentStatus === PaymentStatus.PAID) {
      for (const item of order.items) {
        const warehouse = item.variant.inventoryLevels[0]?.warehouseId;
        if (warehouse) {
          await this.stockMovementService.createMovement({
            variantId: item.variantId,
            warehouseId: warehouse,
            type: StockMoveType.RECEIVE_RETURN,
            quantity: item.quantity,
            referenceType: 'ORDER_CANCEL',
            referenceId: orderId,
            reasonCode: 'CANCELLED',
            notes: `Order cancellation: ${reason}`,
          });
        }
      }
    }

    // Update order status
    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.CANCELLED,
        cancelledAt: new Date(),
        notes: reason,
      },
    });

    return { message: 'Order cancelled successfully' };
  }

  private async generateOrderNumber(): Promise<string> {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    
    const prefix = `SG${year}${month}${day}`;
    
    // Get the count of orders today
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
    
    const orderCount = await this.prisma.order.count({
      where: {
        placedAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });
    
    const sequence = (orderCount + 1).toString().padStart(4, '0');
    return `${prefix}${sequence}`;
  }

  private calculateShipping(subtotal: number, address: any): number {
    // Simple shipping calculation - can be made more sophisticated
    if (subtotal >= 100) return 0; // Free shipping over $100
    return 15; // Flat rate shipping
  }
}
