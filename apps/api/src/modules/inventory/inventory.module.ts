import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { StockMovementService } from './stock-movement.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [PrismaModule, CacheModule],
  controllers: [InventoryController],
  providers: [InventoryService, StockMovementService],
  exports: [InventoryService, StockMovementService],
})
export class InventoryModule {}
