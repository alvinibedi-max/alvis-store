# Alvis security/production implementation

This build adds the security and checkout architecture from the Alvis master specification without enabling supplier purchases automatically.

## Required services
- Upstash Redis REST: durable sessions, checkout state, approvals, orders, inventory reservations, supplier/review/audit records, idempotency.
- Stripe Checkout + signed webhooks: customer payment without Alvis storing raw card data.
- Twilio: 6-digit phone OTP with expiry, attempts and resend cooldown.
- Resend: email verification and operational notifications.
- Vercel Cron: durable sourcing job execution rather than fire-and-forget serverless work.

## Important
The project intentionally fails closed when required production secrets are missing. Do not add secrets to source control. Configure them in Vercel Environment Variables.

The customer-facing checkout does not expose specialist AI output. Private sourcing reports are stored under protected server keys and are not returned by storefront routes.

Supplier purchasing remains a separate capability and should only be enabled after supplier adapters, purchase authorization, provider settlement verification, refund handling, and human/admin controls are connected.
