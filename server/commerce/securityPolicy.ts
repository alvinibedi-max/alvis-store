/**
 * Alvis V2 security policy constants.
 * These are deliberately kept server-side and contain no customer-facing bypass rules.
 * They are configuration targets for the production implementation.
 */

export const CHECKOUT_EXPIRY_MINUTES = 30;
export const PHONE_OTP_LENGTH = 6;
export const PHONE_OTP_EXPIRY_MINUTES = 10;
export const PHONE_OTP_MAX_ATTEMPTS = 5;
export const PHONE_OTP_RESEND_COOLDOWN_SECONDS = 60;

export const PROTECTED_ORDER_STATES = new Set([
  'AI_REVIEW',
  'HUMAN_REVIEW',
  'ON_HOLD',
]);

export const NON_SHIPPABLE_STATES = new Set([
  'PENDING',
  'PAYMENT_PENDING',
  'ADDRESS_CHECK',
  'AI_REVIEW',
  'HUMAN_REVIEW',
  'ON_HOLD',
  'CANCELLED',
  'REFUNDED',
]);

export const ADMIN_ROLES = [
  'SUPPORT',
  'OPERATIONS',
  'SOURCING_MANAGER',
  'FINANCE',
  'ADMIN',
  'OWNER',
] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];
