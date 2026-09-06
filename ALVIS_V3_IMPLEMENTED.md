# Alvis V3 implementation map

This revision implements the supplied Alvis checkout/security requirements as server-side code while preserving the existing storefront and specialist sourcing code.

## Implemented
- Server-side sessions using HttpOnly/Secure/SameSite cookies; no localStorage auth authority.
- Password hashing with Node scrypt and minimum password length.
- Account consent and configurable blocked/exception email-domain policy.
- Email verification and password reset via Resend.
- Google OAuth and Apple OAuth callback scaffolding with state protection and signed OIDC verification.
- 6-digit phone OTP for registered and guest checkout flows, 10-minute expiry, 5 attempts, 60-second resend cooldown.
- Durable checkout records with checkout ID, attempt ID, version, address version, policy/validation versions, expiry and state.
- Server-side address validation with independent Address AI and Destination AI investigations.
- Central decision engine with APPROVE / HUMAN_REVIEW / BLOCK outcomes.
- One-time approval tokens bound to checkout, attempt, address version and policy version.
- Trusted product/quantity/price resolution from the server product catalogue; frontend totals are not trusted.
- Inventory records with available/reserved/committed/incoming/returned/damaged quantities and checkout reservations.
- Stripe Checkout integration using provider-hosted payment collection; Alvis does not store card/CVV data.
- Stripe webhook signature verification, timestamp/replay protection and event idempotency.
- Payment failure/expired checkout reservation release and refund API support.
- Atomic-style backend order creation after payment, approval-token validation and final address recheck.
- Customer order access restricted by authenticated user ownership.
- Guest order claim flow via short-lived email claim token.
- Explicit order state transition machine; review/on-hold states cannot ship.
- Durable sourcing queue processed by Vercel Cron instead of fire-and-forget serverless work.
- Existing 21 specialist sourcing checks retained; Final Inspector count corrected to 21 and hard-gate behaviour strengthened.
- Private sourcing reports and operational data kept off customer-facing routes.
- Supplier records, preferred-supplier selection, internal profitability model and supplier purchase adapter interface.
- Supplier purchasing is fail-closed and disabled until explicitly enabled/configured.
- Shipment records with carrier/tracking/status/estimate support.
- Admin role checks for reviews, inventory, suppliers, shipments and refunds.
- Country-specific customer pricing/market/currency/shipping logic was not added; current checkout remains single-currency GBP as required by the latest supplied specification.

## Still requires external configuration / operational setup
- Upstash Redis credentials.
- Stripe account, webhook secret and production payment configuration.
- Twilio credentials and verified sending number.
- Resend API key and verified sender/domain.
- Google OAuth credentials/redirect URI.
- Apple Sign In credentials, key, team ID and redirect URI.
- Production domain and `APP_URL`.
- Real inventory quantities and warehouse records.
- Real supplier adapters and contracts. Supplier purchasing remains disabled by default.
- Human review operations and owner/admin account provisioning.

## Important
No real payment or supplier purchasing should be considered live until the above services are configured and the deployment/security test matrix has been executed against the deployed environment.
