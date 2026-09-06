import type {CommerceOrder, CustomerPayment, FinanceSnapshot, Money, OrderState, SupplierQuote} from './types';

const gbp = (amount: number): Money => ({amount: Math.round((amount + Number.EPSILON) * 100) / 100, currency: 'GBP'});
const emptyFinance = (): FinanceSnapshot => ({
  revenue: gbp(0), supplierCost: gbp(0), shipping: gbp(0), paymentFees: gbp(0), refunds: gbp(0), otherCosts: gbp(0),
  actualProfit: gbp(0), availableMargin: gbp(0), profitVerified: false, settlementVerified: false,
});

/** In-memory only until a durable database and payment-provider webhook store are configured. */
const orders = new Map<string, CommerceOrder>();
const addAudit = (order: CommerceOrder, actor: string, action: string, detail: string) =>
  order.audit.push({at: new Date().toISOString(), actor, action, detail});

export function createPendingOrder(input: {productSummary: string; quantity: number; customerEmail: string; total: number}) {
  const id = `ALVIS-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const order: CommerceOrder = {
    id, state: 'PAYMENT_PENDING', productSummary: input.productSummary, quantity: input.quantity, customerEmail: input.customerEmail,
    total: gbp(input.total), finance: emptyFinance(), audit: [],
  };
  addAudit(order, 'Order system', 'ORDER_CREATED', 'Awaiting a signed payment-provider event.');
  orders.set(id, order);
  return order;
}

export function getOrder(id: string) { return orders.get(id); }
export function listOrders() { return [...orders.values()]; }
export function addInternalAudit(order: CommerceOrder, actor: string, action: string, detail: string) {
  addAudit(order, actor, action, detail);
}

/** Called only by a verified provider webhook, never from the storefront. */
export function verifyCustomerPayment(order: CommerceOrder, payment: CustomerPayment) {
  if (payment.status !== 'succeeded' || payment.amount.amount !== order.total.amount) {
    order.state = 'REVIEW';
    addAudit(order, 'Payment Verification AI', 'PAYMENT_REVIEW', 'Provider payment failed, is not successful, or does not match the order total.');
    return order;
  }
  order.payment = {...payment, verifiedAt: new Date().toISOString()};
  order.state = 'PAYMENT_VERIFIED';
  addAudit(order, 'Payment Verification AI', 'PAYMENT_VERIFIED', `Provider transaction ${payment.providerTransactionId} independently matched to order total.`);
  return order;
}

export function approveSupplierSpend(order: CommerceOrder, quote: SupplierQuote, minimumMargin = 0) {
  if (order.state !== 'PAYMENT_VERIFIED' || !order.payment || !quote.independentlyVerified || new Date(quote.validUntil) <= new Date()) {
    order.state = 'REVIEW';
    addAudit(order, 'Spending Controller', 'PURCHASE_BLOCKED', 'Payment, independently verified quote, or quote validity gate failed.');
    return order;
  }
  const quoteTotal = quote.productCost.amount + quote.shippingCost.amount;
  const cap = order.payment.amount.amount - order.payment.providerFee.amount - minimumMargin;
  order.supplierQuote = quote;
  order.spendCap = gbp(cap);
  if (quoteTotal > cap) {
    order.state = 'REVIEW';
    addAudit(order, 'Spending Controller', 'PURCHASE_BLOCKED', `Supplier total £${quoteTotal} exceeds approved cap £${cap}.`);
    return order;
  }
  order.state = 'PURCHASE_APPROVED';
  addAudit(order, 'Spending Controller', 'PURCHASE_APPROVED', `Supplier cap set to £${cap}; verified quote is £${quoteTotal}.`);
  return order;
}

/** Recalculates solely from recorded transactions; it never trusts a sourcing estimate. */
export function verifyProfit(order: CommerceOrder, input: {supplierCost: number; shipping: number; refunds?: number; otherCosts?: number}) {
  if (!order.payment || !order.supplierQuote) throw new Error('Cannot verify profit without a provider payment and supplier transaction.');
  const refunds = input.refunds ?? 0;
  const otherCosts = input.otherCosts ?? 0;
  const actualProfit = order.payment.amount.amount - input.supplierCost - input.shipping - order.payment.providerFee.amount - refunds - otherCosts;
  order.finance = {
    revenue: order.payment.amount, supplierCost: gbp(input.supplierCost), shipping: gbp(input.shipping), paymentFees: order.payment.providerFee,
    refunds: gbp(refunds), otherCosts: gbp(otherCosts), actualProfit: gbp(actualProfit),
    availableMargin: gbp(order.payment.settled && actualProfit > 0 ? actualProfit : 0), profitVerified: true, settlementVerified: order.payment.settled,
  };
  order.state = order.payment.settled ? 'PROFIT_VERIFIED' : 'SETTLED';
  addAudit(order, 'Profit Verification AI', 'PROFIT_VERIFIED', `Independent ledger calculation completed. Available margin remains £0 until settlement.`);
  return order;
}

export const publicOrder = (order: CommerceOrder) => ({id: order.id, state: order.state, total: order.total, createdAt: order.audit[0]?.at});

export const canReleaseSupplierPayment = (order: CommerceOrder) =>
  order.state === 'PURCHASE_APPROVED' && Boolean(order.payment?.verifiedAt && order.supplierQuote?.independentlyVerified && order.spendCap);
