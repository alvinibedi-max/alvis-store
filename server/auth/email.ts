import {randomBytes, createHash} from 'node:crypto';
import {redisSetJson,redisGetJson} from '../db/redis';
import type {User} from './service';
export const hashToken=(v:string)=>createHash('sha256').update(v).digest('hex');
export async function issueEmailVerification(user:User){const raw=randomBytes(32).toString('base64url');const ttl=86400;await redisSetJson(`email_verify:${hashToken(raw)}`,{userId:user.id},ttl);await sendEmail(user.email,'Verify your Alvis email',`Verify your email by opening ${process.env.APP_URL}/auth/verify-email?token=${encodeURIComponent(raw)}`);}
export async function verifyEmail(raw:string){const rec=await redisGetJson<{userId:string}>(`email_verify:${hashToken(raw)}`);if(!rec)throw new Error('Verification link is invalid or expired.');return rec.userId;}
async function sendEmail(to:string,subject:string,text:string){const key=process.env.RESEND_API_KEY;const from=process.env.EMAIL_FROM;if(!key||!from)throw new Error('Email delivery is not configured.');const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from,to,subject,text})});if(!r.ok)throw new Error('Unable to send email.');}
