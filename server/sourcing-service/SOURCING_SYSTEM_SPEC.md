# ALVIS STORE — MASTER AI SOURCING & PRODUCT VERIFICATION SYSTEM

## 1. MAIN OBJECTIVE

The AI system must find, research, verify and purchase legitimate products for customers while minimizing:

- Incorrect products
- Fake/counterfeit products
- Bad sellers
- Incorrect prices
- Incorrect profit calculations
- Regional incompatibility
- Locked devices
- Warranty problems
- Safety problems
- Legal/import problems
- Customer complaints
- Returns
- Over-ordering
- Under-ordering
- Research mistakes
- AI hallucinations
- Conflicting information

**The system must prioritize accuracy, safety, legality and verified profit over speed.**

### CRITICAL RULE
**The AI must NEVER guess important information.**

---

## 2. MULTI-AI ARCHITECTURE

The system must NOT rely on one AI to perform the entire process.

```
Customer Order
    ↓
Product Identification
    ↓
20 Specialist AIs (running in parallel)
    ↓
Independent Evidence Collection
    ↓
Conflict Detection
    ↓
3 Conflict Investigation AIs (if needed)
    ↓
Risk Assessment
    ↓
Profit Calculation & Verification
    ↓
Final Inspector (complete case review)
    ↓
3-5 Verification Cycles
    ↓
Final Decision:
  🟢 APPROVE
  🟡 HUMAN REVIEW
  🔴 REJECT
    ↓
IF HUMAN REVIEW:
  Human Review Communication AI
    ↓
  User Approval Required
```

---

## 3. THE 20 SPECIALIST AIs

### AI 1 — PRODUCT IDENTIFICATION AI
**Identifies the exact product.**

Must verify:
- Brand
- Exact product name
- Exact model
- Exact model number
- SKU
- Generation/Version
- Storage configuration
- RAM
- Main specifications
- Colour/variant when relevant
- Condition (New/Refurbished/Used)
- Included accessories

**Critical Rule:** Never treat two products as identical simply because their names look similar.

### AI 2 — REGION & VERSION AI
**Identifies the product's original market/version.**

Distinguishes between:
- **Product Region/Version:** Market the unit was manufactured/configured for
- **Seller Country:** Where the seller is located
- **Target Resale Country:** Where customer will receive/resell

Checks:
- Regional model number
- Cellular bands (for phones)
- SIM/eSIM compatibility
- Software differences
- Regional features
- Warranty terms
- Charger/plug compatibility
- Voltage requirements
- Regulatory requirements

### AI 3 — LOCK & ACTIVATION AI
**For phones and cellular devices, verifies lock status:**

- Unlocked ✅
- Carrier locked ⚠️
- Region locked ⚠️
- Activation lock ⚠️
- SIM restrictions ⚠️
- eSIM restrictions ⚠️

**Rule:** Never assume a device is unlocked because the listing doesn't mention a lock.

### AI 4 — PRICE & PURCHASE AI
**Finds the real purchase price.**

Calculates:
```
Product price
  + Shipping
  + Taxes/Duties
  + Agent fees
  + Payment fees
  + Currency conversion
  _______________
= TRUE LANDED COST
```

### AI 5 — SELLER VERIFICATION AI
**Checks individual seller trustworthiness.**

Verifies:
- Seller identity
- Seller history & age
- Seller rating & reviews
- Number of sales completed
- Return policy
- Warranty offered
- Authorized retailer status
- Counterfeit risk history
- Previous complaints

**Rule:** A reputable website does NOT guarantee every seller on it is trustworthy.

### AI 6 — PRODUCT HISTORY & REVIEW AI
**Researches product's market history.**

Checks:
- Customer reviews (all time)
- Historical ratings
- Recurring complaints
- Known defects/recalls
- Battery complaints (if applicable)
- Software problems
- Hardware failures
- Warranty complaints
- Failure rates
- Trend analysis (improving/declining)

**Rating Rule:**
- **4.0+ ratings:** Continue normally
- **Below 4.0:** Investigate heavily

Consider: Rating + review count + review age + complaint types.

### AI 7 — RESALE PRICE AI
**Determines realistic selling price in target market.**

Research:
- Current market listings (exact model)
- Recent completed sales
- Exact condition match
- Regional price differences
- Competitive landscape
- Demand level
- Market saturation

**Rule:** Never use the highest listing as expected price.

### AI 8 — PROFIT CALCULATION AI
**Calculates expected net profit independently.**

```
Expected selling revenue
  − Purchase price
  − Shipping
  − Taxes/Duties
  − Agent fees
  − Payment fees
  − Currency conversion
  − Marketplace selling fees
  − Customer shipping
  − Expected returns/refunds
  − Other known costs
  ___________________
= EXPECTED NET PROFIT
```

### AI 9 — DEMAND & MARKET AI
**Checks market viability.**

Research:
- Product demand level
- Number of competing listings
- Market saturation
- Sales velocity
- Seasonal trends
- Product popularity
- Search interest

### AI 10 — HISTORICAL PRICE AI
**Tracks price patterns.**

Analyzes:
- Previous purchase prices
- Historical resale prices
- Price drops/increases
- Seasonal patterns
- Sale events
- Temporary vs. permanent discounts
- Trend direction

### AI 11 — AUTHENTICITY & COUNTERFEIT AI
**Checks for fake/counterfeit products.**

Verifies:
- Authenticity markers
- Fake product indicators
- Specification consistency
- Price reasonableness
- Seller trustworthiness
- Packaging details
- Serial numbers (when available)

**Rule:** If counterfeit risk cannot be resolved → REJECT

### AI 12 — WARRANTY & RETURN AI
**Verifies warranty terms.**

Checks:
- Manufacturer warranty duration
- Warranty coverage area
- International warranty transferability
- Seller warranty offered
- Return period length
- Restocking fees
- Return shipping responsibility
- International return feasibility
- Refund conditions

### AI 13 — COMPATIBILITY AI
**Verifies product works in target market.**

Technical checks:
- Cellular bands compatibility
- SIM/eSIM support
- Wi-Fi standards
- Bluetooth version
- GPS compatibility
- Voltage compatibility
- Charger compatibility
- Software/firmware compatibility
- Operating system compatibility
- Accessory compatibility

### AI 14 — SAFETY AI
**Identifies safety risks.**

Critical for:
- E-bikes & E-scooters
- Electric skateboards
- Batteries & Chargers
- Power stations
- Drones
- High-powered electronics

Checks:
- Battery specifications & certifications
- Charger safety ratings
- Electrical safety compliance
- Recall history
- Known safety incidents
- Shipping restrictions
- Fire/explosion risk

**Rule:** Serious safety issue → REJECT

### AI 15 — LEGAL & IMPORT AI
**Verifies legal resaleability.**

Checks:
- Import regulations
- Product restrictions
- Wireless device regulations
- Battery regulations
- Safety certifications required
- Regional resale requirements
- Local market regulations
- Warranty validity in target region

**Rule:** Cannot establish legality → HUMAN REVIEW or REJECT

### AI 16 — LISTING ACCURACY AI
**Verifies listing matches actual product.**

Compares:
- Title vs. Specifications
- Description vs. Images
- Specifications vs. Model number
- Images match product
- SKU accuracy
- Storage/RAM accuracy
- Included accessories match listing

**Rule:** Any conflict requires investigation.

### AI 17 — AVAILABILITY & QUANTITY AI
**Verifies stock & fulfillment.**

Checks:
- Current stock levels
- Available quantity
- Maximum order limits
- Customer requested quantity
- Backorder status
- Preorder conditions
- Discontinued status

**Customer Quantity Rule:**
```
Maximum 3 units per customer/order
(unless user explicitly authorizes inventory purchasing)

Example:
Customer A → 1 unit
Customer B → 2 units
Required total → 3 units (exact)
NOT 4, 5, or 6.
```

### AI 18 — PRODUCT CONDITION AI
**Identifies actual product condition.**

Verifies:
- New (sealed, never opened)
- Open-box (opened but unused)
- Refurbished (professionally restored)
- Used (previously owned)
- Damaged
- Unknown condition → REJECT if condition-critical

**Rule:** Never treat refurbished/used as NEW.

### AI 19 — RISK & ANOMALY AI
**Detects unusual patterns.**

Red flags:
- Unrealistically low prices
- Suspicious seller behavior
- Contradictory information
- Strange specifications
- Fake discount claims
- Unusual warranty offers
- Unusual shipping terms
- Sudden product disappearance
- Generic/stock images

**Question:** "What could go wrong with this deal?"

### AI 20 — INDEPENDENT AUDITOR AI
**Independent verification of critical conclusions.**

Reviews:
- Product identification accuracy
- Region verification
- Lock status confirmation
- Seller trustworthiness
- Price accuracy
- Quantity correctness
- Review & history verification
- Compatibility confirmation
- Profit calculation accuracy
- Legal/Safety completion
- Evidence sufficiency

**Mission:** Search specifically for mistakes made by other AIs.

---

## 4. THREE CONFLICT INVESTIGATION AIs

**If specialist AIs disagree, do NOT use majority voting.**

### CONFLICT AI 1 — EVIDENCE INVESTIGATOR
**Finds original evidence sources.**

- Verifies source reliability
- Checks dates & accuracy
- Compares evidence strength
- Determines which evidence wins

### CONFLICT AI 2 — INDEPENDENT RESEARCHER
**Starts research from scratch.**

- Independently verifies disputed information
- Does NOT trust previous AI conclusions
- Conducts fresh investigation
- Documents findings

### CONFLICT AI 3 — ADVERSARIAL AUDITOR
**Attempts to disprove conclusion.**

Searches for:
- Contradictory evidence
- Hidden costs
- Wrong model/region
- Fake listing indicators
- Profit miscalculations
- Warranty problems
- Safety/Legal issues

### CRITICAL CONFLICT RULE
**Cannot be resolved by vote. If unresolvable → HUMAN REVIEW**

---

## 5. FINAL INSPECTOR AI

After all specialists and conflict AIs complete their work, the Final Inspector reviews the entire case.

Must verify:
- ✓ Exact product identification
- ✓ Exact model number
- ✓ Region/version compatibility
- ✓ Target resale country suitability
- ✓ Lock status (if applicable)
- ✓ Condition verification
- ✓ Seller reputation
- ✓ Authenticity confirmation
- ✓ Product reviews & history
- ✓ Warranty terms & validity
- ✓ Compatibility confirmation
- ✓ Safety assessment
- ✓ Legal/import status
- ✓ Stock availability
- ✓ Quantity fulfillment
- ✓ Purchase price accuracy
- ✓ True landed cost calculation
- ✓ Realistic selling price
- ✓ Marketplace fees calculation
- ✓ Expected net profit
- ✓ Evidence quality
- ✓ Conflict resolution
- ✓ Confidence levels

**Rule:** Final Inspector must inspect evidence, not just trust other AIs.

---

## 6. VERIFICATION CYCLES

**Before ordering, repeat the entire verification process:**

- **Minimum:** 3 complete verification cycles
- **High-risk/High-value products:** 5 cycles

Each cycle independently verifies key information.

**Comparison Example:**

Cycle 1 → £152 profit ✓
Cycle 2 → £147 profit ✓
Cycle 3 → £150 profit ✓
**Result:** Consistent (PROCEED)

VS.

Cycle 1 → £155 profit ❌
Cycle 2 → £92 profit ❌
Cycle 3 → £41 profit ❌
**Result:** Highly inconsistent → HUMAN REVIEW REQUIRED

---

## 7. PROFIT REQUIREMENTS

```
£145+ → TARGET / STRONG DEAL
£45–£144 → ACCEPTABLE (if all checks pass)
Below £45 → REJECT
```

**Based on EXPECTED NET PROFIT, not simple price difference.**

### Profit Confidence Rule
Must provide:
- Expected profit
- Realistic range
- Confidence level

Example:
```
Expected: £150
Range: £130–£170
Confidence: 94%
→ APPROVED
```

VS.

```
Expected: £50
Range: £10–£80
Confidence: 40%
→ REQUIRES ADDITIONAL VERIFICATION
```

---

## 8. MISSING INFORMATION RULE

**UNKNOWN ≠ YES**
**UNKNOWN ≠ NO**
**UNKNOWN = INVESTIGATE**

If missing information affects:
- Product identity
- Compatibility
- Safety
- Legality
- Authenticity
- Price
- Profit
- Warranty
- Resale value

→ Do NOT automatically approve.

---

## 9. SOURCE & EVIDENCE RULE

Every conclusion must include:

```
CLAIM: What the AI believes
EVIDENCE: Why it believes it
SOURCE: Where info came from
DATE: When it was verified
CONFIDENCE: How certain (%)
```

Example:
```
Claim: Device is factory unlocked
Evidence: Seller states + manufacturer verification
Source: Official seller + manufacturer docs
Date: 2026-08-11
Confidence: 96%
```

---

## 10. SOURCE PRIORITY

When information conflicts, prioritize:

1. Manufacturer official docs
2. Official documentation
3. Authorized retailer
4. Established retailer
5. Reliable marketplace seller
6. Reliable independent source
7. Customer reviews
8. Forums/social media

Lower sources can provide warning signals but shouldn't override authoritative sources.

---

## 11. PRODUCT REVIEW RULE

Research product history, not just current listing.

Investigate:
- Current rating
- Historical rating trend
- Number of reviews
- Recent reviews
- Older reviews
- Recurring complaints
- Common failures
- Warranty complaints

**Automatic Trigger:** Rating below 4.0 → Deep investigation required

---

## 12. NO FAKE PROFIT RULE

**NEVER use:**
- Highest listing price
- One unusually expensive listing
- Outdated prices
- Different model
- Different region
- Different condition

Purchase product and resale product must be **equivalent**.

---

## 13. NO BLIND TRUST RULE

No AI is automatically trusted.

**Redundancy:**
- If one AI fails → Another AI takes over
- If AI gives incomplete info → Another AI repeats task
- If AIs disagree → Send to 3 Conflict AIs
- If conflict remains → HUMAN REVIEW

---

## 14. HUMAN REVIEW COMMUNICATION AI

When human intervention needed, notify user with:

```
HUMAN REVIEW REQUIRED

Product: [exact name]
Customer: [order reference]
Quantity: [number]
Expected Profit: [£amount]
Problem: [specific issue]
Evidence: [key findings]
Risk Level: [LOW/MEDIUM/HIGH]
Recommended Action: [what to check]
```

**Rule:** Never secretly approve the product.

---

## 15. AUTOMATIC REJECTION RULES

System must REJECT if:

- ❌ Product is counterfeit
- ❌ Product identity unverifiable
- ❌ Critical model info missing
- ❌ Critical region info missing
- ❌ Critical lock status unknown
- ❌ Serious safety problem
- ❌ Unresolved serious recall
- ❌ Cannot legally import/resell
- ❌ Highly suspicious seller
- ❌ Unknown condition (when critical)
- ❌ True cost uncalculable
- ❌ Expected profit below £45
- ❌ Product unavailable
- ❌ Quantity unfulfillable
- ❌ Major compatibility problem
- ❌ Evidence indicates fraud
- ❌ Critical unresolved conflict

---

## 16. FINAL DECISION LEVELS

### 🟢 GREEN — APPROVE
- All information verified
- No critical conflicts
- Product legitimate
- Seller acceptable
- Compatibility confirmed
- Quantity correct
- Profit ≥ £45
- No safety/legal issues
- Verification cycles agree
- Final Inspector approves

→ **APPROVE & ORDER**

### 🟡 YELLOW — HUMAN REVIEW
Something needs human confirmation:
- Conflicting region/price info
- Unclear warranty
- Rating below 4.0 (with investigation)
- Unusual pricing
- Seller uncertainty
- Conflicting profit calculations
- High-risk product
- Important missing info

→ **DO NOT ORDER UNTIL USER APPROVES**

### 🔴 RED — REJECT
Serious problem:
- Counterfeit risk
- Safety issue
- Illegal product
- Unverifiable product
- Unacceptable seller
- Profit below £45
- Major incompatibility
- Unresolved critical conflict

→ **DO NOT ORDER**

---

## 17. MASTER GOLDEN RULE

**DO NOT think:**
> "I found a cheap product, therefore I should buy it."

**DO think:**
> "I found a potentially profitable product. Now I must prove:
> - It is the correct product
> - It is legitimate
> - It is safe
> - It is compatible
> - It is legally resellable
> - It is available in required quantity
> - It is sold by reliable seller
> - It will genuinely produce expected profit"

Only after evidence supports ALL conditions → Consider ordering.

---

## 18. ABSOLUTE RULES

### NEVER:
- ❌ Guess important information
- ❌ Hide uncertainty
- ❌ Override critical conflict
- ❌ Purchase if critical fact unverified
- ❌ Use unrealistic selling price for fake profit
- ❌ Buy more than required quantity
- ❌ Trust one AI blindly
- ❌ Approve counterfeit risk
- ❌ Approve safety risks
- ❌ Override legal concerns

### ALWAYS:
- ✓ Verify exact product
- ✓ Check product history
- ✓ Check reviews & ratings
- ✓ Check region/version
- ✓ Check lock status (when applicable)
- ✓ Calculate true net profit
- ✓ Repeat verification before ordering
- ✓ Document evidence
- ✓ Resolve conflicts properly
- ✓ Notify user for review when needed

---

## 19. IMPLEMENTATION STATUS

- ✅ Core Orchestrator
- ✅ 11 Specialist AIs Implemented
- ✅ Risk Assessment
- ✅ Profit Calculator
- ✅ Human Review Workflow
- ✅ Email Notification System
- 🔄 Final Inspector AI (in progress)
- 🔄 Conflict Investigation AIs (in progress)
- 🔄 3-5 Verification Cycles (planned)
- 🔄 Remaining Specialist AIs (planned)

---

## 20. CUSTOMER ORDER FLOW

```
Customer Places Order
        ↓
ORDER RECEIVED
        ↓
PRODUCT IDENTIFICATION & RESEARCH
        ↓
20 SPECIALIST AIs EVALUATE (parallel)
        ↓
EVIDENCE COLLECTION & ANALYSIS
        ↓
CONFLICT DETECTION
        ↓
CONFLICT INVESTIGATION (if needed)
        ↓
RISK ASSESSMENT
        ↓
PROFIT VERIFICATION
        ↓
FINAL INSPECTOR REVIEW
        ↓
VERIFICATION CYCLE 1 → VERIFIED
        ↓
VERIFICATION CYCLE 2 → CONFIRMED
        ↓
VERIFICATION CYCLE 3 → FINAL CHECK
        ↓
        │
        ├─ 🟢 ALL CHECKS PASS
        │      ↓
        │   ORDER PLACED
        │
        ├─ 🟡 HUMAN REVIEW NEEDED
        │      ↓
        │   SEND EMAIL TO: alvinibedi@gmail.com
        │      ↓
        │   INCLUDE: Product name, risks, issues, evidence
        │      ↓
        │   WAIT FOR USER APPROVAL
        │      ↓
        │   IF APPROVED → ORDER
        │   IF REJECTED → CANCEL
        │
        └─ 🔴 REJECT
               ↓
            CANCEL ORDER
            NOTIFY CUSTOMER
```

---

**Last Updated:** 2026-08-11  
**Version:** 1.0  
**Status:** Active & Expanding
