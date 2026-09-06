# Alvis V3 implementation progress

This build continues from the original Alvis store; it is not a replacement storefront.

## Security hardening completed in this pass
- Guest checkout is allowed to reach the payment-session endpoint; authenticated checkout remains supported.
- Approval-token consumption is protected by a short Redis lock and a second read before marking the token used, reducing double-spend/replay races.
- OAuth state is now single-use instead of reusable until expiry.
- OIDC identity tokens now require issuer, audience and non-expired claims in addition to signature verification.
- Inventory reservations use a per-product Redis lock to reduce overselling races during concurrent checkouts.

## Validation status
- The archive is structurally valid.
- A full TypeScript/Vite build could not be completed in this environment because npm dependency installation timed out and the available workspace does not contain the required type packages.
- Real production services remain configuration-gated: Upstash Redis, Twilio, Resend, Stripe and OAuth credentials.
- Supplier purchasing remains disabled unless explicitly enabled with ALVIS_ENABLE_SUPPLIER_PURCHASES=true.


## Step 1 — Account-only checkout + payment gate
- Guest checkout removed from the checkout flow and guest OTP endpoint/helpers removed.
- `/checkout` now requires a signed-in Alvis account.
- Checkout creation requires the authenticated account and binds the checkout to that user.
- Phone verification uses the authenticated account OTP endpoint.
- Address, phone-verification, and security-check actions verify checkout ownership.
- Payment session creation requires authentication and verifies checkout ownership.
- Client-submitted product prices are never trusted; the server resolves prices from the Alvis product catalogue.
- Payment amount is calculated server-side.
- Stripe Checkout session creation is implemented with idempotency support.
- Stripe webhook verifies the signed event and then retrieves the Checkout Session from Stripe before accepting payment, checking payment status, checkout metadata, and amount.
- Real Stripe payments remain disabled until `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are configured.
