import {OrderRequest, ProductSourcingEvaluation, SourcingReport, FinalDecision} from './types';
import {runProductIdentification} from './agents/ProductIdentificationAgent';
import {runQuantityValidation} from './agents/QuantityAgent';
import {runPriceResearch} from './agents/PriceResearchAgent';
import {runSellerVerification} from './agents/SellerVerificationAgent';
import {runProductHistory} from './agents/ProductHistoryAgent';
import {runCompatibility} from './agents/CompatibilityAgent';
import {runWarranty} from './agents/WarrantyAgent';
import {runLegalCompliance} from './agents/LegalComplianceAgent';
import {runAuthenticity} from './agents/AuthenticityAgent';
import {runProfitCalculation} from './agents/ProfitCalculatorAgent';
import {runRisk} from './agents/RiskAgent';
import {runRegionVersion} from './agents/RegionVersionAgent';
import {runLockStatus} from './agents/LockStatusAgent';
import {runResalePrice} from './agents/ResalePriceAgent';
import {runDemandMarket} from './agents/DemandMarketAgent';
import {runHistoricalPrice} from './agents/HistoricalPriceAgent';
import {runListingAccuracy} from './agents/ListingAccuracyAgent';
import {runAvailabilityQuantity} from './agents/AvailabilityQuantityAgent';
import {runProductCondition} from './agents/ProductConditionAgent';
import {runAnomalyRisk} from './agents/AnomalyRiskAgent';
import {runSupplierSourcePreference} from './agents/SupplierSourcePreferenceAgent';
import {runFinalInspector} from './agents/FinalInspectorAI';
import {buildEvidence, nowTimestamp} from './utils';
import {sendHumanReviewEmail} from './email';

export async function runOrchestration(order: OrderRequest): Promise<SourcingReport> {
  // Run all 20 specialist AIs + supplier preference in parallel
  const [identity, quantityValidation, price, seller, productHistory, compatibility, warranty, legalCompliance, authenticity, profit, risk, region, lockStatus, resalePrice, demandMarket, historicalPrice, listingAccuracy, availability, condition, anomalyRisk, supplierSource] = await Promise.all([
    runProductIdentification(order),
    runQuantityValidation(order),
    runPriceResearch(order),
    runSellerVerification(order),
    runProductHistory(order),
    runCompatibility(order),
    runWarranty(order),
    runLegalCompliance(order),
    runAuthenticity(order),
    runProfitCalculation(order, 0),
    runRisk(order),
    runRegionVersion(order),
    runLockStatus(order),
    runResalePrice(order),
    runDemandMarket(order),
    runHistoricalPrice(order),
    runListingAccuracy(order),
    runAvailabilityQuantity(order),
    runProductCondition(order),
    runAnomalyRisk(order),
    runSupplierSourcePreference(order),
  ]);

  const evaluation: ProductSourcingEvaluation = {
    request: order,
    identity,
    price,
    seller,
    productHistory,
    compatibility,
    warranty,
    legalCompliance,
    authenticity,
    quantityValidation,
    profit,
    risk,
    region,
    lockStatus,
    resalePrice,
    demandMarket,
    historicalPrice,
    listingAccuracy,
    availability,
    condition,
    anomalyRisk,
    supplierSource,
    audit: [
      buildEvidence('Orchestration started', `Running complete 20-AI sourcing workflow + supplier preference analysis for order ${order.customerOrderId}`, 'Orchestrator', 'High'),
    ],
  };

  // Final Inspector AI reviews entire case
  const finalDecision: FinalDecision = await runFinalInspector(evaluation);

  // Send email notification if human review is needed
  if (finalDecision.decision === 'HUMAN_REVIEW') {
    sendHumanReviewEmail(evaluation, finalDecision);
  }

  return {evaluation, finalDecision};
}

// Note: Final decision is now made by FinalInspectorAI which reviews all 20 specialist AIs
// and 3 conflict investigation AIs (when needed)
