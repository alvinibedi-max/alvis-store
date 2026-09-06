import {json,redirect} from '@remix-run/node';
import {verifyEmail,hashToken} from '../../server/auth/email';
import {redisGetJson,redisSetJson,redisCommand} from '../../server/db/redis';
import type {User} from '../../server/auth/service';
export async function loader({request}:{request:Request}){const token=new URL(request.url).searchParams.get('token');if(!token)return json({error:'Missing verification token.'},{status:400});try{const id=await verifyEmail(token);const user=await redisGetJson<User>(`user:${id}`);if(!user)throw new Error('Account not found.');await redisSetJson(`user:${id}`,{...user,emailVerified:true});await redisCommand('DEL',`email_verify:${hashToken(token)}`);return redirect('/account?verified=1');}catch(e){return json({error:e instanceof Error?e.message:'Verification failed.'},{status:400});}}
export default function VerifyEmail(){return <div className="p-10 text-center">Email verification is processing…</div>}
