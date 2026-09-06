/**
 * Financial records are deliberately separate from sourcing results.  A sourcing
 * recommendation is never evidence that a customer has paid or that profit exists.
 */
export type OrderState =
  // Customer/fulfilment state machine target states
  | 'PENDING'
  | 'ADDRESS_CHECK'
  | 'AI_REVIEW'
  | 'HUMAN_REVIEW'
  | 'APPROVED'
  | 'PROCESSING'
  | 'DELIVERED'
  | 'ON_HOLD'
  | 'REFUNDED'
  // Existing commerce states retained for compatibility during migration
  | 'PAYMENT_PENDING'
  | 'PAYMENT_VERIFIED'
  | 'REVIEW'
  | 'SOURCING'
  | 'PURCHASE_APPROVED'
  | 'SUPPLIER_PAID'
  | 'FULFILMENT'
  | 'SHIPPED'
  | 'FULFILLED'
  | 'SETTLED'
  | 'PROFIT_VERIFIED'
  | 'CANCELLED';

export type Money = {amount: number; currency: 'GBP'};

export type CustomerPayment = {
  provider: string;
  providerTransactionId: string;
  amount: Money;
  status: 'succeeded' | 'pending' | 'failed' | 'refunded' | 'disputed';
  settled: boolean;
  providerFee: Money;
  verifiedAt?: string;
};

export type SupplierQuote = {
  supplierId: string;
  quoteReference: string;
  product: string;
  quantity: number;
  productCost: Money;
  shippingCost: Money;
  validUntil: string;
  independentlyVerified: boolean;
};

export type FinanceSnapshot = {
  revenue: Money;
  supplierCost: Money;
  shipping: Money;
  paymentFees: Money;
  refunds: Money;
  otherCosts: Money;
  actualProfit: Money;
  availableMargin: Money;
  profitVerified: boolean;
  settlementVerified: boolean;
};

export type CheckoutMetadata = {
  checkoutId: string;
  attemptId: string;
  checkoutVersion: number;
  addressVersion?: number;
  policyVersion?: string;
  validationVersion?: string;
  expiresAt: string;
};

export type ApprovalTokenMetadata = {
  tokenId: string;
  checkoutId: string;
  attemptId: string;
  addressVersion?: number;
  policyVersion?: string;
  expiresAt: string;
  usedAt?: string;
};

export type AuditEvent = {
  at: string;
  actor: string;
  action: string;
  detail: string;
};

export type CommerceOrder = {
  id: string;
  state: OrderState;
  productSummary: string;
  quantity: number;
  customerEmail: string;
  total: Money;
  payment?: CustomerPayment;
  supplierQuote?: SupplierQuote;
  spendCap?: Money;
  finance: FinanceSnapshot;
  audit: AuditEvent[];
  checkout?: CheckoutMetadata;
  approvalToken?: ApprovalTokenMetadata;
  fulfilmentLocked?: boolean;
};
