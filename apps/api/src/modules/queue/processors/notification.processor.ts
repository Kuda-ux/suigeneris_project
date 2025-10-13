import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Processor('notifications')
@Injectable()
export class NotificationProcessor {
  private readonly logger = new Logger(NotificationProcessor.name);

  constructor(private prisma: PrismaService) {}

  @Process('send-email')
  async handleSendEmail(job: Job) {
    const { to, subject, template, context } = job.data;
    
    try {
      // Here you would integrate with your email service (SendGrid, SES, etc.)
      this.logger.log(`Sending email to ${to} with subject: ${subject}`);
      
      // Mock email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update notification status
      await this.prisma.notification.updateMany({
        where: {
          recipient: to,
          subject,
          status: 'PENDING',
        },
        data: {
          status: 'SENT',
          sentAt: new Date(),
        },
      });

      this.logger.log(`Email sent successfully to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}:`, error);
      
      await this.prisma.notification.updateMany({
        where: {
          recipient: to,
          subject,
          status: 'PENDING',
        },
        data: {
          status: 'FAILED',
          error: error.message,
        },
      });
      
      throw error;
    }
  }

  @Process('send-sms')
  async handleSendSMS(job: Job) {
    const { to, message } = job.data;
    
    try {
      // Here you would integrate with your SMS service (Twilio, etc.)
      this.logger.log(`Sending SMS to ${to}`);
      
      // Mock SMS sending
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.logger.log(`SMS sent successfully to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send SMS to ${to}:`, error);
      throw error;
    }
  }

  @Process('low-stock-alert')
  async handleLowStockAlert(job: Job) {
    const { variantId, productName, available, threshold, warehouse } = job.data;
    
    try {
      // Send email to inventory managers
      const inventoryManagers = await this.prisma.user.findMany({
        where: {
          role: { in: ['ADMIN', 'INVENTORY_MANAGER'] },
        },
      });

      for (const manager of inventoryManagers) {
        await this.prisma.notification.create({
          data: {
            type: 'LOW_STOCK',
            channel: 'email',
            recipient: manager.email,
            subject: `Low Stock Alert: ${productName}`,
            payload: {
              variantId,
              productName,
              available,
              threshold,
              warehouse,
              managerName: manager.name,
            },
          },
        });
      }

      this.logger.log(`Low stock alert created for ${productName} in ${warehouse}`);
    } catch (error) {
      this.logger.error(`Failed to create low stock alert:`, error);
      throw error;
    }
  }

  @Process('abandoned-cart')
  async handleAbandonedCart(job: Job) {
    const { cartId } = job.data;
    
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { id: cartId },
        include: {
          customer: true,
          items: {
            include: {
              variant: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });

      if (!cart || !cart.customer?.email) {
        this.logger.log(`Cart ${cartId} not found or no customer email`);
        return;
      }

      // Check if cart still has items and hasn't been converted to order
      if (cart.items.length === 0) {
        this.logger.log(`Cart ${cartId} is empty, skipping abandoned cart email`);
        return;
      }

      await this.prisma.notification.create({
        data: {
          type: 'ABANDONED_CART',
          channel: 'email',
          recipient: cart.customer.email,
          subject: 'Complete your purchase - Items waiting in your cart',
          payload: {
            cartId,
            customerName: cart.customer.name,
            items: cart.items.map(item => ({
              name: item.variant.product.name,
              variantName: item.variant.name,
              quantity: item.quantity,
              price: item.price,
            })),
            totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
            totalValue: cart.items.reduce((sum, item) => sum + (item.quantity * Number(item.price)), 0),
          },
        },
      });

      this.logger.log(`Abandoned cart email queued for ${cart.customer.email}`);
    } catch (error) {
      this.logger.error(`Failed to handle abandoned cart:`, error);
      throw error;
    }
  }
}
