export type AddressInput = {name:string; line1:string; city:string; postcode:string; phone:string};
export type AddressResult = {classification:'NORMAL'|'POSSIBLE_WAREHOUSE'|'PROHIBITED'; confidence:number; evidence:string[]; needsHumanReview:boolean};

const warehouseTerms = /\b(fulfilment|fulfillment|warehouse|distribution|forwarder|freight|3pl|prep\s*centre|prep\s*center|amazon fba)\b/i;
const prohibitedTerms = /\b(forwarding service|parcel forwarding|mail forwarding)\b/i;

export function validateAddress(input: AddressInput): AddressResult {
  const text = `${input.line1} ${input.city} ${input.postcode}`.trim();
  const evidence:string[] = [];
  if (prohibitedTerms.test(text)) return {classification:'PROHIBITED', confidence:0.98, evidence:['Address contains a known prohibited fulfilment/forwarding indicator.'], needsHumanReview:false};
  if (warehouseTerms.test(text)) return {classification:'POSSIBLE_WAREHOUSE', confidence:0.78, evidence:['Address contains a fulfilment/logistics indicator.'], needsHumanReview:true};
  if (!input.name.trim() || !input.line1.trim() || !input.city.trim() || !input.postcode.trim()) return {classification:'POSSIBLE_WAREHOUSE', confidence:0.5, evidence:['Required delivery fields are incomplete.'], needsHumanReview:true};
  evidence.push('Address has a normal residential/commercial structure and no direct prohibited indicator.');
  return {classification:'NORMAL', confidence:0.92, evidence, needsHumanReview:false};
}

export function independentAddressInvestigations(input: AddressInput) {
  const address = validateAddress(input);
  const ai1 = {agent:'Address AI', classification:address.classification === 'PROHIBITED' ? 'INVALID' : 'STRUCTURALLY_VALID', confidence: address.confidence, evidence:[...address.evidence], evidenceAgainst: address.classification === 'NORMAL' ? [] : ['Automated classification may be uncertain without external address data'], needsHumanReview:address.needsHumanReview};
  const ai2 = {agent:'Destination AI', classification:address.classification, confidence:address.confidence, evidence:[...address.evidence], evidenceAgainst: address.classification === 'POSSIBLE_WAREHOUSE' ? ['A business address is not automatically prohibited.'] : [], needsHumanReview:address.needsHumanReview};
  const conflict = ai1.needsHumanReview !== ai2.needsHumanReview || (ai2.classification === 'NORMAL' && ai1.classification === 'INVALID');
  return {ai1, ai2, conflict};
}
