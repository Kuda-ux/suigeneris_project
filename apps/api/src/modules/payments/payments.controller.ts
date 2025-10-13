import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Headers,
  RawBody,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('providers')
  @ApiOperation({ summary: 'Get available payment providers' })
  getProviders() {
    return {
      providers: this.paymentsService.getAvailableProviders(),
    };
  }

  @Post(':provider/create-intent')
  @ApiOperation({ summary: 'Create payment intent' })
  async createPaymentIntent(
    @Param('provider') provider: string,
    @Body() body: {
      amount: number;
      currency: string;
      metadata?: any;
    },
  ) {
    return this.paymentsService.createPaymentIntent(
      provider,
      body.amount,
      body.currency,
      body.metadata,
    );
  }

  @Post(':provider/confirm')
  @ApiOperation({ summary: 'Confirm payment' })
  async confirmPayment(
    @Param('provider') provider: string,
    @Body() body: {
      paymentIntentId: string;
      paymentMethodId?: string;
    },
  ) {
    return this.paymentsService.confirmPayment(
      provider,
      body.paymentIntentId,
      body.paymentMethodId,
    );
  }

  @Post(':provider/refund')
  @ApiOperation({ summary: 'Refund payment' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.FINANCE)
  @ApiBearerAuth()
  async refundPayment(
    @Param('provider') provider: string,
    @Body() body: {
      paymentId: string;
      amount?: number;
      reason?: string;
    },
  ) {
    return this.paymentsService.refundPayment(
      provider,
      body.paymentId,
      body.amount,
      body.reason,
    );
  }

  @Get(':provider/status/:paymentId')
  @ApiOperation({ summary: 'Get payment status' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.FINANCE, Role.SALES)
  @ApiBearerAuth()
  async getPaymentStatus(
    @Param('provider') provider: string,
    @Param('paymentId') paymentId: string,
  ) {
    return this.paymentsService.getPaymentStatus(provider, paymentId);
  }

  @Post(':provider/webhook')
  @ApiOperation({ summary: 'Handle payment webhook' })
  async handleWebhook(
    @Param('provider') provider: string,
    @RawBody() payload: Buffer,
    @Headers('stripe-signature') stripeSignature?: string,
    @Headers('paypal-transmission-sig') paypalSignature?: string,
  ) {
    const signature = stripeSignature || paypalSignature;
    return this.paymentsService.handleWebhook(provider, payload, signature);
  }
}
