import {Confidence, Timestamp} from './types';

export function nowTimestamp(): Timestamp {
  return new Date().toISOString();
}

export function buildEvidence(claim: string, evidence: string, source: string, confidence: Confidence): {claim: string; evidence: string; source: string; confidence: Confidence; timestamp: Timestamp} {
  return {claim, evidence, source, confidence, timestamp: nowTimestamp()};
}

export function mergeUnknownableNumber(values: Array<number | 'UNKNOWN'>): number | 'UNKNOWN' {
  const valid = values.filter((value): value is number => value !== 'UNKNOWN');
  return valid.length > 0 ? valid.reduce((sum, current) => sum + current, 0) : 'UNKNOWN';
}

export function clampPercentage(value: number): number {
  return Math.min(100, Math.max(0, value));
}
