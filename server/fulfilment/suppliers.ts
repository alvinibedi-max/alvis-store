import {randomBytes} from 'node:crypto';
import {redisCommand,redisGetJson,redisSetJson} from '../db/redis';
export type Supplier={id:string;company:string;country:string;contact?:string;products:string[];cost:number;currency:string;shippingOptions:string[];reliabilityScore:number;notes?:string;status:'ACTIVE'|'PAUSED'|'BLOCKED';preferred?:boolean};
export async function saveSupplier(input:Omit<Supplier,'id'>){const id=`sup_${randomBytes(8).toString('hex')}`;const s={...input,id};await redisSetJson(`supplier:${id}`,s);await redisCommand('SADD','suppliers',id);return s;}
export async function getSupplier(id:string){return redisGetJson<Supplier>(`supplier:${id}`);}
export async function getPreferredSupplier(productId:string){const ids=await redisCommand<string[]>('SMEMBERS','suppliers')||[];const suppliers=(await Promise.all(ids.map(getSupplier))).filter(Boolean) as Supplier[];return suppliers.filter(s=>s.status==='ACTIVE'&&s.products.includes(productId)).sort((a,b)=>Number(b.preferred)-Number(a.preferred)||b.reliabilityScore-a.reliabilityScore)[0]??null;}
export function internalProfitability(revenue:number,supplierCost:number,shipping:number,tax:number,fees:number){const profit=revenue-supplierCost-shipping-tax-fees;return {revenue,supplierCost,shipping,tax,fees,profit,profitMargin:revenue>0?profit/revenue:0};}
