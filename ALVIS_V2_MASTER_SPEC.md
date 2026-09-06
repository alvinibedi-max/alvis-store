# Alvis V2 Master Store Specification

This document records the requirements added to the existing Alvis store before production fixes begin. It is a target specification, not a claim that every item is already implemented.

## 1. Customer accounts and authentication

- Email signup and login.
- Google login.
- Apple login.
- Explicit consent before account creation.
- Do not request date of birth.
- Check email account type according to store policy; explain rejected account types without silently deleting or changing customer information.
- Phone verification by SMS one-time code.
- Six-digit OTP, short expiry, resend cooldown, limited attempts, rate limiting, and protection against automated SMS abuse.
- A verified phone proves control of the number; it is not a trust score.
- Secure server-side sessions using HTTP-only, Secure, SameSite cookies; no authentication authority in localStorage.
- Password hashing, password reset, email verification, session expiry, logout, account security events, and protection against credential stuffing.
- Customer access is limited to the customer's own account, addresses, orders, returns and other private data.

## 2. Guest checkout

- Guest checkout remains available where policy permits.
- Guest orders receive a secure checkout/attempt identity.
- Sensitive order information must not be exposed merely by knowing an order number.
- A guest can be invited to create/claim an account through a secure, expiring flow.

## 3. Customer-friendly checkout

Customer flow:

Account -> Phone -> Product -> Delivery -> Checking -> Payment -> Order

The UI should remain simple while security and investigation happen behind the scenes.

Every checkout has:
- unique checkout ID
- unique attempt ID
- checkout version
- current state
- creation time
- expiration time
- server-controlled state transitions

The browser cannot skip or manufacture checkout steps.

## 4. Delivery information and address protection

- Validate address structure and required fields.
- Validate postcode where applicable to the configured delivery system.
- Classify destination type without assuming that every business address is prohibited.
- Detect known prohibited warehouse/fulfilment/forwarder destinations.
- Normal address -> continue.
- Known prohibited destination -> stop fulfilment and request an alternative where appropriate.
- Uncertain destination -> independent investigation.
- Do not reveal internal anti-abuse rules or signals to customers.
- Store address versions so that an approved address cannot silently be replaced later.
- Changing an address after approval invalidates the relevant approval and triggers a fresh check.

## 5. Independent AI investigation

For uncertain destination/address cases:

### AI 1 - Address AI
Checks address structure, formatting, possible errors, confidence and evidence.

### AI 2 - Destination AI
Independently checks warehouse, fulfilment, forwarding and other prohibited destination categories.

### AI 3 - Behaviour/Anomaly AI
Checks unusual checkout behaviour and anomaly signals.

AI investigators must work independently. AI #2 must not be shown AI #1's conclusion before producing its own report.

Each investigation returns:
- classification
- confidence
- supporting evidence
- contradicting evidence
- sources/evidence used
- whether human review is needed

A central decision engine evaluates the independent reports. Conflicting or uncertain cases can go to human review.

## 6. Human review

Human review records:
- case
- case/version
- current address version
- relevant evidence
- AI results
- reason code
- policy version
- human decision
- human reason
- timestamp

Decisions: APPROVE / BLOCK / CUSTOMER ACTION.

Review events are immutable/auditable. If checkout facts change, the old approval cannot be reused automatically.

## 7. Order state machine

Target customer/fulfilment states:

PENDING
PAYMENT_PENDING
PAYMENT_VERIFIED
ADDRESS_CHECK
AI_REVIEW
HUMAN_REVIEW
APPROVED
PROCESSING
SHIPPED
DELIVERED
ON_HOLD
CANCELLED
REFUNDED

No arbitrary status changes. Only valid state transitions are accepted by the backend.

Orders in AI_REVIEW, HUMAN_REVIEW or ON_HOLD must not enter fulfilment.

## 8. Final backend security gate

All checks -> Central Decision -> Owner Protection -> Final Backend Recheck -> One-time Approval -> Payment -> Atomic Order Creation -> Token Used -> Immutable Order Snapshot -> Audit Record -> Order Created.

The frontend cannot approve. An AI cannot approve. A customer cannot approve. An individual external service cannot approve. Only the authorized backend can make the final order decision.

## 9. Approval tokens

Approval tokens must be:
- tied to the checkout
- tied to the attempt
- tied to the address version
- tied to the policy/validation versions
- single-use
- unexpired
- server-verifiable
- unusable after consumption

## 10. Payment security

- Use a reputable payment processor.
- Never store raw card numbers or CVV in Alvis.
- Use tokenized payment methods where supported.
- Support authorization, confirmation, failure, refunds, partial refunds and provider risk signals.
- Payment success is established by verified server-side provider events, not by a browser success message.
- Never trust client-supplied totals, product prices or supplier costs.

## 11. Webhook security

Every external webhook must:
- verify its signature
- validate the event ID/type
- prevent replay
- be idempotent
- record processing status
- safely handle duplicates
- use raw request data for signature verification where required by the provider

## 12. Idempotency and concurrency

Protect against:
- double-click checkout
- network retries
- payment retries
- duplicate webhooks
- simultaneous order creation
- repeated approval requests

Use server-side idempotency keys and database uniqueness constraints/transactions.

## 13. Inventory

Support:
- available stock
- reserved stock
- committed stock
- incoming stock
- returned stock
- damaged stock
- warehouse location
- supplier stock where applicable

Reserve stock during checkout when required. Release on failed/expired payment; commit on successful payment. Prevent overselling through atomic inventory operations.

## 14. Supplier system

Supplier records are separate from customers and contain:
- supplier ID
- company
- country
- contact
- products
- cost
- currency
- shipping options
- reliability score
- notes
- status

A product may have multiple suppliers. Supplier cost is never exposed to customers.

Internal landed-cost calculation includes purchase cost, shipping, tax/duty where applicable, fees, required accessories, customer shipping and other configured costs.

Supplier purchasing remains behind backend authorization and the Alvis Final Inspector/approval process.

## 15. Shipping and fulfilment

Support:
- shipping methods
- shipping price
- delivery estimates
- carriers
- tracking numbers
- shipment status
- fulfilment locks
- independent fulfilment status verification

An order cannot ship while blocked, under review, or on hold.

## 16. Returns and refunds

Support return requests, return status, refund status, full refunds and partial refunds where supported by the payment provider and store policy.

Refunds must be authorized server-side and recorded in the financial/audit system.

## 17. Admin and permissions

Create a private admin system with role-based access control. Suggested roles:

CUSTOMER
SUPPORT
OPERATIONS
SOURCING_MANAGER
FINANCE
ADMIN
OWNER

High-risk actions require explicit permissions. Customer sessions must never grant admin privileges.

Admin actions must be audited.

## 18. Audit and decision records

Every important security/order decision should retain structured records including:
- checkout ID
- attempt ID
- account status
- phone status
- address version
- address validation
- destination classification
- payment risk result
- AI results
- AI confidence
- policy version
- validation versions
- decision engine version
- customer attempt count
- decision
- reason code
- created time
- expiry
- current state

Do not expose sensitive internal security rules to customers.

## 19. Database and durability

Replace in-memory order/sourcing state with a persistent database before real production use.

Persist orders, checkout attempts, sessions, users, phone verification records, addresses/address versions, approvals, payment events, webhook events, inventory reservations, supplier quotes, sourcing reports, human reviews, fulfilment records, refunds and audit events.

Use transactions for atomic operations and unique constraints for idempotency.

## 20. AI sourcing integration with existing Alvis

Keep the existing specialist sourcing architecture, but treat current TypeScript agents as modules until real model/provider integrations are deliberately added.

The sourcing workflow must remain private to customers and must not itself establish payment success.

The existing Final Inspector must be unified into one authoritative implementation. Hard safety/financial gates must be deterministic backend rules; AI judgement can inform review but cannot override hard gates.

## 21. Security testing

Before launch test attempts to:
- bypass phone verification
- bypass address checks
- bypass AI review
- change price
- change quantity
- change address after approval
- reuse approval tokens
- pay twice
- create duplicate orders
- skip checkout steps
- access another customer's order
- access admin functions
- modify request parameters
- call sensitive APIs directly without the UI
- exploit concurrent requests/race conditions

The backend must enforce business rules even when the normal UI is completely bypassed.

## 22. Deployment, backups and monitoring

Production target must include:
- secure environment variables/secrets
- production database
- durable background jobs/queue for sourcing and fulfilment work
- structured logs
- monitoring and alerting
- backups and recovery procedure
- staging/preview environment
- production deployment protection
- security testing before live payments/purchases

## 23. Country/market system

The supplied checkout specification explicitly separates the country/Europe system from this current build. Therefore country detection, country-specific pricing, market selection, country-specific tax/shipping and country-specific product availability are not part of this immediate implementation unless deliberately reintroduced later.

## 24. Non-negotiable production rule

Do not enable real customer money movement or automatic supplier purchasing until authentication, persistence, payment verification, webhook idempotency, authorization, order state protection, approval gates, auditability and security testing are implemented and verified.
