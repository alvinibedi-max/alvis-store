export type Confidence = 'Very High' | 'High' | 'Medium' | 'Low' | 'Unknown';

export type Timestamp = string;

export type EvidenceRecord = {
  claim: string;
  evidence: string;
  source: string;
  confidence: Confidence;
  timestamp: Timestamp;
};

export type Unknownable<T> = T | 'UNKNOWN';

export type ProductIdentity = {
  productName: Unknownable<string>;
  brand: Unknownable<string>;
  exactModel: Unknownable<string>;
  modelNumber: Unknownable<string>;
  sku: Unknownable<string>;
  generation: Unknownable<string>;
  storage: Unknownable<string>;
  ram: Unknownable<string>;
  color: Unknownable<string>;
  condition: Unknownable<'New' | 'Open-box' | 'Refurbished' | 'Used' | 'Damaged'>;
  regionVersion: Unknownable<string>;
  targetResaleMarket: Unknownable<string>;
  sellerCountry: Unknownable<string>;
  lockedStatus: Unknownable<'Factory unlocked' | 'Carrier locked' | 'Region locked' | 'Activation locked' | 'Unknown'>;
  carrier: Unknownable<string>;
  simType: Unknownable<'SIM' | 'eSIM' | 'Both' | 'None'>;
  compatibilityNotes: Unknownable<string>;
  accessoriesIncluded: Unknownable<string>;
  warrantyStatus: Unknownable<string>;
  returnPolicy: Unknownable<string>;
};

export type CostBreakdown = {
  purchasePrice: Unknownable<number>;
  shipping: Unknownable<number>;
  taxes: Unknownable<number>;
  duties: Unknownable<number>;
  agentFees: Unknownable<number>;
  paymentFees: Unknownable<number>;
  currencyConversion: Unknownable<number>;
  requiredAccessoriesCost: Unknownable<number>;
  sellingFees: Unknownable<number>;
  customerShipping: Unknownable<number>;
  expectedReturnCost: Unknownable<number>;
  otherCosts: Unknownable<number>;
  totalLandedCost: Unknownable<number>;
};

export type RiskScore = {
  counterfeitRisk: number;
  compatibilityRisk: number;
  legalRisk: number;
  supplierRisk: number;
  productQualityRisk: number;
  overallRisk: number;
};

export type VerificationStatus = {
  completed: boolean;
  missingFields: string[];
  unknownFields: string[];
  confidence: Confidence;
};

export type AgentResult<T> = {
  agentName: string;
  result: T;
  evidence: EvidenceRecord[];
  status: VerificationStatus;
};

export type OrderRequest = {
  customerOrderId: string;
  productQuery: string;
  quantity: number;
  customerCountry?: string;
  desiredMarket?: string;
  maxUnitsPerCustomer?: number;
};

export type ProductSourcingEvaluation = {
  request: OrderRequest;
  identity: AgentResult<ProductIdentity>;
  price: AgentResult<CostBreakdown>;
  seller: AgentResult<{sellerName: string; sellerRating: Unknownable<number>; sellerCountry: Unknownable<string>; sellerAgeMonths: Unknownable<number>; authorized: Unknownable<boolean>; trustScore?: number}>;
  productHistory: AgentResult<{rating: Unknownable<number>; reviewCount: Unknownable<number>; recurringIssues: Unknownable<string>; recallNotes: Unknownable<string>; ageNotes: Unknownable<string>}>;
  compatibility: AgentResult<{compatible: Unknownable<boolean>; issues: Unknownable<string>; notes: Unknownable<string>; compatibilityConfidence?: number}>;
  warranty: AgentResult<{warrantyAvailable: boolean; warrantyValidInTargetMarket: Unknownable<boolean>; coverageSummary: Unknownable<string>; transferable: Unknownable<boolean>}>;
  legalCompliance: AgentResult<{legalStatus: Unknownable<'COMPLIANT' | 'NON_COMPLIANT' | 'UNKNOWN'>; legalToImport: Unknownable<boolean>; shippingRestricted: Unknownable<boolean>; complianceNotes: Unknownable<string>}>;
  authenticity: AgentResult<{authenticityConfidence: number; authenticityNotes: Unknownable<string>}>;
  quantityValidation: AgentResult<{exactQuantity: boolean; requestedQuantity: number; approvedQuantity: number}>;
  profit: AgentResult<{expectedNetProfit: Unknownable<number>; profitStatus: 'TARGET' | 'ACCEPTABLE' | 'REJECT' | 'NEEDS VERIFICATION'; expectedProfit?: number}>;
  risk: AgentResult<RiskScore>;
  region: AgentResult<any>;
  lockStatus: AgentResult<any>;
  resalePrice: AgentResult<any>;
  demandMarket: AgentResult<any>;
  historicalPrice: AgentResult<any>;
  listingAccuracy: AgentResult<any>;
  availability: AgentResult<any>;
  condition: AgentResult<any>;
  anomalyRisk: AgentResult<any>;
  supplierSource: AgentResult<any>;
  audit: EvidenceRecord[];
};

export type FinalDecision = {
  decision: 'APPROVE' | 'HUMAN_REVIEW' | 'REJECT';
  reason: string;
  confidence: Confidence;
  timestamp: Timestamp;
  notes: string[];
};

export type SourcingReport = {
  evaluation: ProductSourcingEvaluation;
  finalDecision: FinalDecision;
};
