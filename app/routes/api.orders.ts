import {json} from '@remix-run/node';
import {getSession} from '../../server/security/session';
import {getSecureOrder,publicSecureOrder} from '../../server/commerce/durableOrderService';
export async function action({request}:{request:Request}){if(request.method!=='GET')return json({error:'Direct order creation is disabled. Orders are created only after verified payment and the final backend gate.'},{status:405});const raw=request.headers.get('Cookie')?.match(/alvis_session=([^;]+)/)?.[1]??null;const session=await getSession(raw);if(!session)return json({error:'Authentication required.'},{status:401});const id=new URL(request.url).searchParams.get('id');if(!id)return json({error:'Order id required.'},{status:400});const order=await getSecureOrder(id);if(!order||order.userId!==session.userId)return json({error:'Order not found.'},{status:404});return json({order:publicSecureOrder(order)});}
export async function loader({request}:{request:Request}){return action({request} as any);}
