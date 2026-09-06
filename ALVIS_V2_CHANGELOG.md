# Alvis V2 Requirements Added

Added the supplied System delivery and checkout requirements to the Alvis project specification.

This update is intentionally a requirements/architecture integration step. Existing working storefront code has not been blindly rewritten and real payment/supplier purchasing has not been enabled.

Primary new requirement areas:
- secure customer authentication and sessions
- Google/Apple/email account access
- consent and phone OTP verification
- guest checkout
- server-controlled checkout state
- address and destination protection
- independent AI investigators
- central decision engine and human review
- fulfilment locks
- protected order state machine
- payment/webhook security
- idempotency and duplicate-order prevention
- inventory reservations
- supplier records and product mappings
- shipping/tracking
- returns/refunds
- admin roles and permissions
- immutable audit/decision records
- persistent database and durable jobs
- security testing
- backups, monitoring and deployment controls

See `ALVIS_V2_MASTER_SPEC.md` for the full target specification.
