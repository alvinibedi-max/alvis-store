import type {OrderState} from './types';
const transitions: Record<OrderState, OrderState[]> = {
  PENDING:['PAYMENT_PENDING','ADDRESS_CHECK','CANCELLED'], PAYMENT_PENDING:['PAYMENT_VERIFIED','CANCELLED','ON_HOLD'], PAYMENT_VERIFIED:['ADDRESS_CHECK','AI_REVIEW','APPROVED','ON_HOLD'], ADDRESS_CHECK:['AI_REVIEW','APPROVED','ON_HOLD'], AI_REVIEW:['HUMAN_REVIEW','ON_HOLD','CANCELLED'], HUMAN_REVIEW:['APPROVED','ON_HOLD','CANCELLED'], APPROVED:['PROCESSING','ON_HOLD','CANCELLED'], PROCESSING:['SHIPPED','ON_HOLD','CANCELLED','REFUNDED'], SHIPPED:['DELIVERED','ON_HOLD','REFUNDED'], DELIVERED:['REFUNDED'], ON_HOLD:['AI_REVIEW','HUMAN_REVIEW','APPROVED','CANCELLED'], CANCELLED:['REFUNDED'], REFUNDED:[],
  REVIEW:['AI_REVIEW','HUMAN_REVIEW','CANCELLED'], SOURCING:['APPROVED','AI_REVIEW','HUMAN_REVIEW','ON_HOLD'], PURCHASE_APPROVED:['PROCESSING','ON_HOLD'], SUPPLIER_PAID:['FULFILMENT','ON_HOLD'], FULFILMENT:['SHIPPED','ON_HOLD'], FULFILLED:['SETTLED'], SETTLED:['PROFIT_VERIFIED'], PROFIT_VERIFIED:[],
};
export function assertTransition(from:OrderState,to:OrderState){if(from===to)return;if(!transitions[from]?.includes(to))throw new Error(`Illegal order state transition: ${from} -> ${to}`);}
export function transition<T extends {state:OrderState}>(order:T,to:OrderState){assertTransition(order.state,to);order.state=to;return order;}
