import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StripePaymentProvider } from './providers/stripe.provider';
import { PaypalPaymentProvider } from './providers/paypal.provider';
import { MobileMoneyProvider } from './providers/mobile-money.provider';
import { PaymentProvider, PaymentIntent, PaymentResult } from './interfaces/payment.interface';

@Injectable()
export class PaymentsService {
  private providers: Map<string, PaymentProvider> = new Map();

  constructor(
    private configService: ConfigService,
    private stripeProvider: StripePaymentProvider,
    private paypalProvider: PaypalPaymentProvider,
    private mobileMoneyProvider: MobileMoneyProvider,
  ) {
    // Register payment providers
    this.providers.set('stripe', this.stripeProvider);
    this.providers.set('paypal', this.paypalProvider);
    this.providers.set('mobile_money', this.mobileMoneyProvider);
  }

  async createPaymentIntent(
    provider: string,
    amount: number,
    currency: string,
    metadata: any = {}
  ): Promise<PaymentIntent> {
    const paymentProvider = this.getProvider(provider);
    return paymentProvider.createPaymentIntent(amount, currency, metadata);
  }

  async confirmPayment(
    provider: string,
    paymentIntentId: string,
    paymentMethodId?: string
  ): Promise<PaymentResult> {
    const paymentProvider = this.getProvider(provider);
    return paymentProvider.confirmPayment(paymentIntentId, paymentMethodId);
  }

  async refundPayment(
    provider: string,
    paymentId: string,
    amount?: number,
    reason?: string
  ): Promise<PaymentResult> {
    const paymentProvider = this.getProvider(provider);
    return paymentProvider.refundPayment(paymentId, amount, reason);
  }

  async getPaymentStatus(provider: string, paymentId: string): Promise<any> {
    const paymentProvider = this.getProvider(provider);
    return paymentProvider.getPaymentStatus(paymentId);
  }

  async handleWebhook(provider: string, payload: any, signature?: string): Promise<any> {
    const paymentProvider = this.getProvider(provider);
    return paymentProvider.handleWebhook(payload, signature);
  }

  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  private getProvider(providerName: string): PaymentProvider {
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new BadRequestException(`Payment provider '${providerName}' not found`);
    }
    return provider;
  }
}
