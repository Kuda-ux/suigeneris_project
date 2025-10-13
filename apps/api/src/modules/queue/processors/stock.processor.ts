import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../../cache/cache.service';
import { StockMovementService } from '../../inventory/stock-movement.service';

@Processor('stock')
@Injectable()
export class StockProcessor {
  private readonly logger = new Logger(StockProcessor.name);

  constructor(
    private prisma: PrismaService,
    private cacheService: CacheService,
    private stockMovementService: StockMovementService,
  ) {}

  @Process('unreserve-expired')
  async handleUnreserveExpired(job: Job) {
    try {
      const pattern = 'stock:reserved:*';
      const keys = await this.cacheService.keys(pattern);
      
      let unreservedCount = 0;
      
      for (const key of keys) {
        const reservation = await this.cacheService.get<{
          quantity: number;
          reservedAt: string;
        }>(key);
        
        if (!reservation) continue;
        
        const reservedAt = new Date(reservation.reservedAt);
        const now = new Date();
        const minutesElapsed = (now.getTime() - reservedAt.getTime()) / (1000 * 60);
        
        // Unreserve if older than 20 minutes
        if (minutesElapsed > 20) {
          const keyParts = key.split(':');
          const variantId = keyParts[2];
          const warehouseId = keyParts[3];
          const cartId = keyParts[4];
          
          try {
            await this.stockMovementService.unreserveStock(
              variantId,
              warehouseId,
              reservation.quantity,
              cartId,
            );
            
            await this.cacheService.del(key);
            unreservedCount++;
            
            this.logger.log(`Unreserved ${reservation.quantity} units of ${variantId} from cart ${cartId}`);
          } catch (error) {
            this.logger.error(`Failed to unreserve stock for key ${key}:`, error);
          }
        }
      }
      
      if (unreservedCount > 0) {
        this.logger.log(`Unreserved stock for ${unreservedCount} expired reservations`);
      }
    } catch (error) {
      this.logger.error('Failed to process expired stock reservations:', error);
      throw error;
    }
  }

  @Process('unreserve-stock')
  async handleUnreserveStock(job: Job) {
    const { variantId, warehouseId, quantity, cartId } = job.data;
    
    try {
      // Check if reservation still exists
      const reservationKey = `stock:reserved:${variantId}:${warehouseId}:${cartId}`;
      const exists = await this.cacheService.exists(reservationKey);
      
      if (!exists) {
        this.logger.log(`Reservation ${reservationKey} no longer exists, skipping unreserve`);
        return;
      }
      
      await this.stockMovementService.unreserveStock(
        variantId,
        warehouseId,
        quantity,
        cartId,
      );
      
      await this.cacheService.del(reservationKey);
      
      this.logger.log(`Unreserved ${quantity} units of ${variantId} from cart ${cartId}`);
    } catch (error) {
      this.logger.error(`Failed to unreserve stock:`, error);
      throw error;
    }
  }
}
