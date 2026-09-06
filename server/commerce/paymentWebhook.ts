import {createHmac, timingSafeEqual} from 'node:crypto';
import type {CustomerPayment} from './types';
import {getOrder, verifyCustomerPayment} from './orderService';

export type PaymentProviderEvent = {orderId: string; payment: CustomerPayment};

export function verifyWebhookSignature(rawBody: string, signature: string | null) {
  const secret = process.env.ALVIS_PAYMENT_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
  const received = Buffer.from(signature, 'hex');
  const expectedBuffer = Buffer.from(expected, 'hex');
  return received.length === expectedBuffer.length && timingSafeEqual(received, expectedBuffer);
}

export function processVerifiedPaymentEvent(event: PaymentProviderEvent) {
  const order = getOrder(event.orderId);
  if (!order) throw new Error('Order not found.');
  return verifyCustomerPayment(order, event.payment);
}
