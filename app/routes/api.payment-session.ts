import {json} from '@remix-run/node';
import {startPayment} from '../../server/payments/checkoutSession';
import {getSession} from '../../server/security/session';
import {getUser} from '../../server/auth/service';

export async function action({request}:{request:Request}) {
  if(request.method!=='POST') return json({error:'Method not allowed'},{status:405});
  try {
    const raw=request.headers.get('Cookie')?.match(/alvis_session=([^;]+)/)?.[1]??null;
    const authSession=await getSession(raw);
    if(!authSession) return json({error:'You must be signed in to pay.'},{status:401});
    const user=await getUser(authSession.userId);
    if(!user) return json({error:'Account not found.'},{status:401});
    const b=await request.json() as any;
    if(!b.checkoutId||!b.approvalToken||!Array.isArray(b.items)||b.items.length===0) return json({error:'Missing secure checkout fields.'},{status:400});
    const payment=await startPayment({
      checkoutId:String(b.checkoutId),
      approvalToken:String(b.approvalToken),
      items:b.items.map((i:any)=>({productId:String(i.productId),quantity:Number(i.quantity)})),
      email:user.email,
      userId:authSession.userId,
      origin:new URL(request.url).origin
    });
    return json({url:payment.url,id:payment.id});
  } catch(e) {
    return json({error:e instanceof Error?e.message:'Unable to start payment.'},{status:400});
  }
}
