import {AgentResult, Unknownable, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence} from '../utils';

export type ProductConditionResult = {
  conditionStatus: Unknownable<'New' | 'Open-box' | 'Refurbished' | 'Used' | 'Damaged' | 'Unknown'>;
  sealing: Unknownable<'Factory sealed' | 'Opened' | 'Not sealed'>;
  functionalStatus: Unknownable<'Fully functional' | 'Minor issues' | 'Major issues' | 'Non-functional'>;
  cosmetic: Unknownable<'Perfect' | 'Minor marks' | 'Visible damage'>;
  batteryHealth: Unknownable<string>;
  conditionConfidence: number;
  conditionNotes: Unknownable<string>;
};

export async function runProductCondition(order: OrderRequest): Promise<AgentResult<ProductConditionResult>> {
  const result: ProductConditionResult = {
    conditionStatus: 'UNKNOWN',
    sealing: 'UNKNOWN',
    functionalStatus: 'UNKNOWN',
    cosmetic: 'UNKNOWN',
    batteryHealth: 'UNKNOWN',
    conditionConfidence: 0,
    conditionNotes: 'UNKNOWN',
  };

  const evidence = [
    buildEvidence(
      'Product condition analysis started',
      `Determining actual condition for: ${order.productQuery}. Is it truly NEW or just claimed to be?`,
      'ProductConditionAgent',
      'Medium',
    ),
  ];

  const status: VerificationStatus = {
    completed: false,
    missingFields: ['conditionStatus', 'sealing', 'functionalStatus'],
    unknownFields: ['conditionStatus', 'sealing', 'batteryHealth'],
    confidence: 'Unknown',
  };

  return {
    agentName: 'ProductConditionAgent',
    result,
    evidence,
    status,
  };
}
