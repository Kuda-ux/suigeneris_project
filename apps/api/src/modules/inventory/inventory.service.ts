import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async getInventoryLevels(filters: {
    variantId?: string;
    warehouseId?: string;
    lowStockOnly?: boolean;
  }) {
    const where: Prisma.InventoryLevelWhereInput = {};
    
    if (filters.variantId) where.variantId = filters.variantId;
    if (filters.warehouseId) where.warehouseId = filters.warehouseId;
    
    const levels = await this.prisma.inventoryLevel.findMany({
      where,
      include: {
        variant: {
          include: {
            product: {
              include: {
                brand: true,
                category: true,
              },
            },
          },
        },
        warehouse: true,
      },
    });

    // Filter for low stock if requested
    if (filters.lowStockOnly) {
      return levels.filter(level => {
        const available = level.onHand - level.reserved;
        return available <= level.lowStock;
      });
    }

    return levels.map(level => ({
      ...level,
      available: level.onHand - level.reserved,
    }));
  }

  async getAvailableStock(variantId: string, warehouseId?: string) {
    const where: Prisma.InventoryLevelWhereInput = {
      variantId,
    };
    
    if (warehouseId) {
      where.warehouseId = warehouseId;
    }

    const levels = await this.prisma.inventoryLevel.findMany({
      where,
      include: {
        warehouse: true,
      },
    });

    if (levels.length === 0) {
      return { totalAvailable: 0, byWarehouse: [] };
    }

    const byWarehouse = levels.map(level => ({
      warehouseId: level.warehouseId,
      warehouseName: level.warehouse.name,
      onHand: level.onHand,
      reserved: level.reserved,
      available: level.onHand - level.reserved,
    }));

    const totalAvailable = byWarehouse.reduce((sum, w) => sum + w.available, 0);

    return { totalAvailable, byWarehouse };
  }

  async updateLowStockThreshold(
    variantId: string,
    warehouseId: string,
    lowStock: number,
  ) {
    const inventoryLevel = await this.prisma.inventoryLevel.findUnique({
      where: {
        variantId_warehouseId: {
          variantId,
          warehouseId,
        },
      },
    });

    if (!inventoryLevel) {
      throw new NotFoundException('Inventory level not found');
    }

    return this.prisma.inventoryLevel.update({
      where: {
        id: inventoryLevel.id,
      },
      data: {
        lowStock,
      },
    });
  }

  async getStockValuation(warehouseId?: string) {
    const where: Prisma.InventoryLevelWhereInput = {};
    if (warehouseId) where.warehouseId = warehouseId;

    const levels = await this.prisma.inventoryLevel.findMany({
      where,
      include: {
        variant: true,
        warehouse: true,
      },
    });

    const valuation = levels.map(level => {
      const available = level.onHand - level.reserved;
      const value = available * Number(level.variant.cost);
      
      return {
        variantId: level.variantId,
        variantSku: level.variant.variantSku,
        warehouse: level.warehouse.name,
        onHand: level.onHand,
        reserved: level.reserved,
        available,
        unitCost: Number(level.variant.cost),
        totalValue: value,
      };
    });

    const totalValue = valuation.reduce((sum, item) => sum + item.totalValue, 0);

    return {
      items: valuation,
      totalValue,
      itemCount: valuation.length,
    };
  }

  async getOutOfStockItems() {
    const levels = await this.prisma.inventoryLevel.findMany({
      where: {
        onHand: {
          lte: this.prisma.inventoryLevel.fields.reserved,
        },
      },
      include: {
        variant: {
          include: {
            product: {
              include: {
                brand: true,
                category: true,
              },
            },
          },
        },
        warehouse: true,
      },
    });

    return levels.map(level => ({
      ...level,
      available: 0,
      product: level.variant.product,
    }));
  }

  async getInventoryTurnover(
    startDate: Date,
    endDate: Date,
    warehouseId?: string,
  ) {
    // Get all ISSUE_SALE movements in the period
    const where: Prisma.StockMovementWhereInput = {
      type: 'ISSUE_SALE',
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    };
    
    if (warehouseId) where.warehouseId = warehouseId;

    const movements = await this.prisma.stockMovement.findMany({
      where,
      include: {
        variant: true,
      },
    });

    // Group by variant
    const turnoverByVariant = new Map<string, {
      variantId: string;
      sku: string;
      soldQty: number;
      revenue: number;
    }>();

    movements.forEach(movement => {
      const existing = turnoverByVariant.get(movement.variantId) || {
        variantId: movement.variantId,
        sku: movement.variant.variantSku,
        soldQty: 0,
        revenue: 0,
      };

      existing.soldQty += movement.quantity;
      existing.revenue += movement.quantity * Number(movement.variant.price);

      turnoverByVariant.set(movement.variantId, existing);
    });

    // Get current inventory levels
    const inventoryWhere: Prisma.InventoryLevelWhereInput = {};
    if (warehouseId) inventoryWhere.warehouseId = warehouseId;

    const currentLevels = await this.prisma.inventoryLevel.findMany({
      where: inventoryWhere,
    });

    // Calculate turnover ratio
    const results = Array.from(turnoverByVariant.values()).map(item => {
      const level = currentLevels.find(l => l.variantId === item.variantId);
      const avgInventory = level ? (level.onHand + item.soldQty) / 2 : item.soldQty;
      const turnoverRatio = avgInventory > 0 ? item.soldQty / avgInventory : 0;

      return {
        ...item,
        currentStock: level?.onHand || 0,
        turnoverRatio,
        daysToSell: turnoverRatio > 0 ? 365 / turnoverRatio : null,
      };
    });

    return results.sort((a, b) => b.turnoverRatio - a.turnoverRatio);
  }
}
