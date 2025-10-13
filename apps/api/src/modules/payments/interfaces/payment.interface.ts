export interface PaymentIntent {
  id: string;
  clientSecret?: string;
  status: string;
  amount: number;
  currency: string;
  metadata?: any;
}

export interface PaymentResult {
  id: string;
  status: 'succeeded' | 'failed' | 'pending' | 'cancelled';
  amount: number;
  currency: string;
  transactionId?: string;
  error?: string;
  metadata?: any;
}

export interface PaymentProvider {
  createPaymentIntent(amount: number, currency: string, metadata?: any): Promise<PaymentIntent>;
  confirmPayment(paymentIntentId: string, paymentMethodId?: string): Promise<PaymentResult>;
  refundPayment(paymentId: string, amount?: number, reason?: string): Promise<PaymentResult>;
  getPaymentStatus(paymentId: string): Promise<any>;
  handleWebhook(payload: any, signature?: string): Promise<any>;
}
