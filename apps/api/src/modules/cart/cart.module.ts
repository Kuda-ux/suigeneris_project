import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { InventoryModule } from '../inventory/inventory.module';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [InventoryModule, QueueModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
