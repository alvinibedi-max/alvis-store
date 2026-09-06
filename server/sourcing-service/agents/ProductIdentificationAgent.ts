import {AgentResult, EvidenceRecord, ProductIdentity, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence, nowTimestamp} from '../utils';

const requiredFields: Array<keyof ProductIdentity> = [
  'brand',
  'exactModel',
  'modelNumber',
  'sku',
  'storage',
  'condition',
  'regionVersion',
  'targetResaleMarket',
  'sellerCountry',
  'lockedStatus',
];

export async function runProductIdentification(order: OrderRequest): Promise<AgentResult<ProductIdentity>> {
  const identity: ProductIdentity = {
    brand: 'UNKNOWN',
    exactModel: 'UNKNOWN',
    modelNumber: 'UNKNOWN',
    sku: 'UNKNOWN',
    generation: 'UNKNOWN',
    storage: 'UNKNOWN',
    ram: 'UNKNOWN',
    color: 'UNKNOWN',
    condition: 'UNKNOWN',
    regionVersion: 'UNKNOWN',
    targetResaleMarket: order.desiredMarket ?? order.customerCountry,
    sellerCountry: 'UNKNOWN',
    lockedStatus: 'UNKNOWN',
    carrier: 'UNKNOWN',
    simType: 'UNKNOWN',
    compatibilityNotes: 'UNKNOWN',
    accessoriesIncluded: 'UNKNOWN',
    warrantyStatus: 'UNKNOWN',
    returnPolicy: 'UNKNOWN',
  };

  const evidence: EvidenceRecord[] = [
    buildEvidence(
      'Product identifier initialized',
      `Order query received: ${order.productQuery}`,
      'Sourcing system',
      'High',
    ),
  ];

  const missingFields = requiredFields.filter(field => identity[field] === 'UNKNOWN');

  const status: VerificationStatus = {
    completed: false,
    missingFields,
    unknownFields: missingFields,
    confidence: 'Unknown',
  };

  return {
    agentName: 'ProductIdentificationAgent',
    result: identity,
    evidence,
    status,
  };
}
