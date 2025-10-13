import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StockMoveType, Prisma } from '@prisma/client';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';

@Injectable()
export class StockMovementService {
  constructor(private prisma: PrismaService) {}

  async createMovement(dto: CreateStockMovementDto, userId?: string) {
    // Validate movement type effects
    const isIncreasing = this.isIncreasingMovement(dto.type);
    const isDecreasing = this.isDecreasingMovement(dto.type);
    const isReserve = dto.type === StockMoveType.RESERVE;
    const isUnreserve = dto.type === StockMoveType.UNRESERVE;

    // Start transaction
    return this.prisma.$transaction(async (tx) => {
      // Get current inventory level
      let inventoryLevel = await tx.inventoryLevel.findUnique({
        where: {
          variantId_warehouseId: {
            variantId: dto.variantId,
            warehouseId: dto.warehouseId,
          },
        },
      });

      // Create inventory level if it doesn't exist
      if (!inventoryLevel) {
        inventoryLevel = await tx.inventoryLevel.create({
          data: {
            variantId: dto.variantId,
            warehouseId: dto.warehouseId,
            onHand: 0,
            reserved: 0,
          },
        });
      }

      // Calculate new levels
      let newOnHand = inventoryLevel.onHand;
      let newReserved = inventoryLevel.reserved;

      if (isIncreasing) {
        newOnHand += dto.quantity;
      } else if (isDecreasing) {
        newOnHand -= dto.quantity;
      } else if (isReserve) {
        newReserved += dto.quantity;
      } else if (isUnreserve) {
        newReserved -= dto.quantity;
      }

      // Validate inventory constraints
      if (newOnHand < 0) {
        throw new BadRequestException('Insufficient inventory: would result in negative on-hand quantity');
      }

      if (newReserved < 0) {
        throw new BadRequestException('Cannot unreserve more than currently reserved');
      }

      const available = newOnHand - newReserved;
      if (available < 0) {
        throw new BadRequestException('Insufficient available inventory (on-hand minus reserved)');
      }

      // Update inventory level
      await tx.inventoryLevel.update({
        where: {
          id: inventoryLevel.id,
        },
        data: {
          onHand: newOnHand,
          reserved: newReserved,
        },
      });

      // Create stock movement record
      const movement = await tx.stockMovement.create({
        data: {
          variantId: dto.variantId,
          warehouseId: dto.warehouseId,
          type: dto.type,
          quantity: dto.quantity,
          unitCost: dto.unitCost,
          referenceType: dto.referenceType,
          referenceId: dto.referenceId,
          reasonCode: dto.reasonCode,
          notes: dto.notes,
          userId,
        },
        include: {
          variant: {
            include: {
              product: true,
            },
          },
          warehouse: true,
        },
      });

      // Check for low stock notification
      if (newOnHand - newReserved <= inventoryLevel.lowStock) {
        // Queue low stock notification (will be handled by notification service)
        await tx.notification.create({
          data: {
            type: 'LOW_STOCK',
            channel: 'email',
            recipient: 'inventory@suigeneris.store',
            subject: `Low Stock Alert: ${movement.variant.product.name}`,
            payload: {
              variantId: dto.variantId,
              variantSku: movement.variant.variantSku,
              productName: movement.variant.product.name,
              warehouse: movement.warehouse.name,
              available: newOnHand - newReserved,
              threshold: inventoryLevel.lowStock,
            },
          },
        });
      }

      return movement;
    });
  }

  async transferStock(
    fromWarehouseId: string,
    toWarehouseId: string,
    variantId: string,
    quantity: number,
    userId?: string,
  ) {
    return this.prisma.$transaction(async (tx) => {
      // Create TRANSFER_OUT movement
      await this.createMovement(
        {
          variantId,
          warehouseId: fromWarehouseId,
          type: StockMoveType.TRANSFER_OUT,
          quantity,
          referenceType: 'TRANSFER',
          referenceId: `${fromWarehouseId}-${toWarehouseId}-${Date.now()}`,
        },
        userId,
      );

      // Create TRANSFER_IN movement
      await this.createMovement(
        {
          variantId,
          warehouseId: toWarehouseId,
          type: StockMoveType.TRANSFER_IN,
          quantity,
          referenceType: 'TRANSFER',
          referenceId: `${fromWarehouseId}-${toWarehouseId}-${Date.now()}`,
        },
        userId,
      );

      return { success: true, quantity };
    });
  }

  async reserveStock(variantId: string, warehouseId: string, quantity: number, referenceId?: string) {
    return this.createMovement({
      variantId,
      warehouseId,
      type: StockMoveType.RESERVE,
      quantity,
      referenceType: 'CART',
      referenceId,
    });
  }

  async unreserveStock(variantId: string, warehouseId: string, quantity: number, referenceId?: string) {
    return this.createMovement({
      variantId,
      warehouseId,
      type: StockMoveType.UNRESERVE,
      quantity,
      referenceType: 'CART',
      referenceId,
    });
  }

  async getStockMovements(filters: {
    variantId?: string;
    warehouseId?: string;
    type?: StockMoveType;
    from?: Date;
    to?: Date;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.StockMovementWhereInput = {};

    if (filters.variantId) where.variantId = filters.variantId;
    if (filters.warehouseId) where.warehouseId = filters.warehouseId;
    if (filters.type) where.type = filters.type;
    if (filters.from || filters.to) {
      where.createdAt = {};
      if (filters.from) where.createdAt.gte = filters.from;
      if (filters.to) where.createdAt.lte = filters.to;
    }

    const [movements, total] = await Promise.all([
      this.prisma.stockMovement.findMany({
        where,
        include: {
          variant: {
            include: {
              product: true,
            },
          },
          warehouse: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: filters.limit || 50,
        skip: filters.offset || 0,
      }),
      this.prisma.stockMovement.count({ where }),
    ]);

    return { movements, total };
  }

  private isIncreasingMovement(type: StockMoveType): boolean {
    return [
      StockMoveType.OPENING,
      StockMoveType.RECEIVE,
      StockMoveType.ADJUST_POSITIVE,
      StockMoveType.TRANSFER_IN,
      StockMoveType.RECEIVE_RETURN,
    ].includes(type);
  }

  private isDecreasingMovement(type: StockMoveType): boolean {
    return [
      StockMoveType.ISSUE_SALE,
      StockMoveType.ISSUE_EXCHANGE_OUT,
      StockMoveType.ADJUST_NEGATIVE,
      StockMoveType.TRANSFER_OUT,
      StockMoveType.WRITE_OFF,
    ].includes(type);
  }
}
