import {AgentResult, Unknownable, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence} from '../utils';

export type HistoricalPriceResult = {
  previousPurchasePrices: Unknownable<string>;
  priceDropPercent: Unknownable<number>;
  priceIncreasePercent: Unknownable<number>;
  seasonalPattern: Unknownable<string>;
  priceFrequency: Unknownable<string>;
  trendDirection: Unknownable<'Increasing' | 'Stable' | 'Decreasing'>;
  priceHistoryConfidence: number;
};

export async function runHistoricalPrice(order: OrderRequest): Promise<AgentResult<HistoricalPriceResult>> {
  const result: HistoricalPriceResult = {
    previousPurchasePrices: 'UNKNOWN',
    priceDropPercent: 'UNKNOWN',
    priceIncreasePercent: 'UNKNOWN',
    seasonalPattern: 'UNKNOWN',
    priceFrequency: 'UNKNOWN',
    trendDirection: 'UNKNOWN',
    priceHistoryConfidence: 0,
  };

  const evidence = [
    buildEvidence(
      'Historical price analysis started',
      `Tracking price history for: ${order.productQuery}. Is this price a good deal or temporary discount?`,
      'HistoricalPriceAgent',
      'Medium',
    ),
  ];

  const status: VerificationStatus = {
    completed: false,
    missingFields: ['previousPurchasePrices', 'priceDropPercent', 'trendDirection'],
    unknownFields: ['previousPurchasePrices', 'seasonalPattern', 'priceFrequency'],
    confidence: 'Unknown',
  };

  return {
    agentName: 'HistoricalPriceAgent',
    result,
    evidence,
    status,
  };
}
