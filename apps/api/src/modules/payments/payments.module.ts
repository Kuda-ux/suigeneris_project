import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { StripePaymentProvider } from './providers/stripe.provider';
import { PaypalPaymentProvider } from './providers/paypal.provider';
import { MobileMoneyProvider } from './providers/mobile-money.provider';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    StripePaymentProvider,
    PaypalPaymentProvider,
    MobileMoneyProvider,
  ],
  exports: [PaymentsService],
})
export class PaymentsModule {}
