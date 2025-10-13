import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('notifications') private notificationQueue: Queue,
    @InjectQueue('stock') private stockQueue: Queue,
    @InjectQueue('orders') private orderQueue: Queue,
  ) {}

  // Notification jobs
  async sendEmail(data: {
    to: string;
    subject: string;
    template: string;
    context: any;
  }) {
    return this.notificationQueue.add('send-email', data, {
      attempts: 3,
      backoff: 'exponential',
    });
  }

  async sendSMS(data: {
    to: string;
    message: string;
  }) {
    return this.notificationQueue.add('send-sms', data, {
      attempts: 3,
      backoff: 'exponential',
    });
  }

  async sendLowStockAlert(data: {
    variantId: string;
    productName: string;
    available: number;
    threshold: number;
    warehouse: string;
  }) {
    return this.notificationQueue.add('low-stock-alert', data, {
      priority: 1,
    });
  }

  // Stock jobs
  async unreserveExpiredStock() {
    return this.stockQueue.add('unreserve-expired', {}, {
      repeat: { cron: '*/5 * * * *' }, // Every 5 minutes
    });
  }

  async scheduleStockUnreserve(data: {
    variantId: string;
    warehouseId: string;
    quantity: number;
    cartId: string;
  }, delay: number = 1200000) { // 20 minutes default
    return this.stockQueue.add('unreserve-stock', data, {
      delay,
      removeOnComplete: true,
    });
  }

  // Order jobs
  async processOrderPayment(orderId: string) {
    return this.orderQueue.add('process-payment', { orderId }, {
      attempts: 3,
      backoff: 'exponential',
    });
  }

  async fulfillOrder(orderId: string) {
    return this.orderQueue.add('fulfill-order', { orderId });
  }

  async sendOrderConfirmation(orderId: string) {
    return this.orderQueue.add('order-confirmation', { orderId });
  }

  async sendAbandonedCartEmail(cartId: string, delay: number = 3600000) { // 1 hour default
    return this.notificationQueue.add('abandoned-cart', { cartId }, {
      delay,
      removeOnComplete: true,
    });
  }

  // Utility methods
  async getQueueStats(queueName: string) {
    const queue = this.getQueue(queueName);
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      queue.getWaiting(),
      queue.getActive(),
      queue.getCompleted(),
      queue.getFailed(),
      queue.getDelayed(),
    ]);

    return {
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length,
      delayed: delayed.length,
    };
  }

  private getQueue(name: string): Queue {
    switch (name) {
      case 'notifications':
        return this.notificationQueue;
      case 'stock':
        return this.stockQueue;
      case 'orders':
        return this.orderQueue;
      default:
        throw new Error(`Unknown queue: ${name}`);
    }
  }
}
