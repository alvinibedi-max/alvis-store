import {randomBytes} from 'node:crypto';
import {redisCommand,redisGetJson,redisSetJson} from '../db/redis';
import {assertTransition} from './stateMachine';
import type {OrderState} from './types';
export type SecureOrder={id:string;checkoutId:string;attemptId:string;userId?:string;email:string;productId:string;quantity:number;unitPrice:number;items:{productId:string;name:string;quantity:number;unitPrice:number}[];total:number;currency:'GBP';address:any;addressVersion:number;state:OrderState;approvalTokenId:string;createdAt:string;updatedAt:string;decision?:any;payment?:any;inventoryReservationId?:string;audit:any[]};
const key=(id:string)=>`order:${id}`;
export async function createSecureOrder(input:Omit<SecureOrder,'id'|'state'|'createdAt'|'updatedAt'|'audit'>){const id=`ALVIS-${randomBytes(8).toString('hex').toUpperCase()}`;const now=new Date().toISOString();const o:SecureOrder={...input,id,state:'APPROVED',createdAt:now,updatedAt:now,audit:[{at:now,actor:'Final Backend Gate',action:'ORDER_CREATED',detail:'Atomic order creation after approval, payment and validation gates.'}]};await redisSetJson(key(id),o);await redisCommand('SADD','orders',id);return o;}
export async function getSecureOrder(id:string){return redisGetJson<SecureOrder>(key(id));}
export async function transitionOrder(id:string,to:OrderState,actor:string,detail:string){const o=await getSecureOrder(id);if(!o)throw new Error('Order not found.');assertTransition(o.state,to);o.state=to;o.updatedAt=new Date().toISOString();o.audit.push({at:o.updatedAt,actor,action:`STATE_${to}`,detail});await redisSetJson(key(id),o);return o;}
export async function markPayment(id:string,payment:any){const o=await getSecureOrder(id);if(!o)throw new Error('Order not found.');if(o.payment) return o;o.payment=payment;o.updatedAt=new Date().toISOString();await redisSetJson(key(id),o);return o;}
export function publicSecureOrder(o:SecureOrder){return {id:o.id,state:o.state,total:o.total,currency:o.currency,createdAt:o.createdAt};}
