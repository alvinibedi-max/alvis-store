import {json} from '@remix-run/node';
import {getSession} from '../../server/security/session';
import {getUser} from '../../server/auth/service';
import {createReview,decideReview} from '../../server/reviews/service';
const roles=new Set(['SUPPORT','OPERATIONS','SOURCING_MANAGER','FINANCE','ADMIN','OWNER']);
async function admin(request:Request){const raw=request.headers.get('Cookie')?.match(/alvis_session=([^;]+)/)?.[1]??null;const s=await getSession(raw);if(!s)return null;const u=await getUser(s.userId);return u&&roles.has(u.role)?u:null;}
export async function action({request}:{request:Request}){if(!(await admin(request)))return json({error:'Forbidden'},{status:403});const b=await request.json() as any;try{if(b.action==='create')return json(await createReview(b));return json(await decideReview(String(b.id),b.decision,String(b.reason||'')));}catch(e){return json({error:e instanceof Error?e.message:'Review failed.'},{status:400});}}
