import {AgentResult, Unknownable, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence} from '../utils';

export type LockStatusResult = {
  lockStatus: Unknownable<'Factory unlocked' | 'Carrier locked' | 'Region locked' | 'Activation locked' | 'Unknown'>;
  carrier: Unknownable<string>;
  simType: Unknownable<'SIM' | 'eSIM' | 'Both' | 'None'>;
  unlockingCost: Unknownable<number>;
  unlockingAvailable: boolean;
  simRestrictions: Unknownable<string>;
  lockVerificationConfidence: number;
};

export async function runLockStatus(order: OrderRequest): Promise<AgentResult<LockStatusResult>> {
  const result: LockStatusResult = {
    lockStatus: 'UNKNOWN',
    carrier: 'UNKNOWN',
    simType: 'UNKNOWN',
    unlockingCost: 'UNKNOWN',
    unlockingAvailable: false,
    simRestrictions: 'UNKNOWN',
    lockVerificationConfidence: 0,
  };

  const evidence = [
    buildEvidence(
      'Lock status verification started',
      `Checking lock status for: ${order.productQuery}. Critical for compatibility in ${order.customerCountry}`,
      'LockStatusAgent',
      'Medium',
    ),
  ];

  const status: VerificationStatus = {
    completed: false,
    missingFields: ['lockStatus', 'carrier', 'simType'],
    unknownFields: ['lockStatus', 'carrier', 'simRestrictions'],
    confidence: 'Unknown',
  };

  return {
    agentName: 'LockStatusAgent',
    result,
    evidence,
    status,
  };
}
