import {randomBytes, randomInt, createHash} from 'node:crypto';
import {redisCommand, redisGetJson, redisSetJson} from '../db/redis';
import {hashPassword, verifyPassword} from '../security/password';
import {scrypt as nodeScrypt, timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';
const scrypt = promisify(nodeScrypt);
async function hashOtp(code: string) { const salt = randomBytes(16); const d = await scrypt(code, salt, 32) as Buffer; return `${salt.toString('hex')}.${d.toString('hex')}`; }
async function verifyOtp(code: string, encoded: string) { const [saltHex, hashHex] = encoded.split('.'); if (!saltHex || !hashHex) return false; const d = await scrypt(code, Buffer.from(saltHex, 'hex'), 32) as Buffer; const h = Buffer.from(hashHex, 'hex'); return d.length === h.length && timingSafeEqual(d, h); }

export type User = {id: string; email: string; name: string; phone?: string; phoneVerified: boolean; emailVerified: boolean; role: 'CUSTOMER'|'SUPPORT'|'OPERATIONS'|'SOURCING_MANAGER'|'FINANCE'|'ADMIN'|'OWNER'; passwordHash: string; consentAt: string; createdAt: string};
const emailKey = (email: string) => `user:email:${email.trim().toLowerCase()}`;
const userKey = (id: string) => `user:${id}`;

function validateConsumerEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalized)) throw new Error('Enter a valid email address.');
  const domain = normalized.split('@')[1];
  const blocked = new Set((process.env.ALVIS_BLOCKED_EMAIL_DOMAINS ?? 'school.edu,college.edu').split(',').map(x => x.trim()).filter(Boolean));
  if (blocked.has(domain)) throw new Error('Please use a personal email address for a customer account.');
  return normalized;
}

export async function registerUser(input: {email: string; password: string; name: string; consent: boolean}) {
  if (!input.consent) throw new Error('Consent is required before creating an account.');
  const email = validateConsumerEmail(input.email);
  if (!input.name.trim()) throw new Error('Name is required.');
  if (await redisGetJson<string>(emailKey(email))) throw new Error('An account already exists for this email.');
  const id = `usr_${randomBytes(12).toString('hex')}`;
  const now = new Date().toISOString();
  const user: User = {id, email, name: input.name.trim(), phoneVerified: false, emailVerified: false, role: 'CUSTOMER', passwordHash: await hashPassword(input.password), consentAt: now, createdAt: now};
  await redisSetJson(userKey(id), user);
  await redisSetJson(emailKey(email), id);
  await redisCommand('SADD', 'users', id);
  return user;
}

export async function authenticate(email: string, password: string) {
  const normalized = validateConsumerEmail(email);
  const id = await redisGetJson<string>(emailKey(normalized));
  if (!id) throw new Error('Invalid email or password.');
  const user = await redisGetJson<User>(userKey(id));
  if (!user || !(await verifyPassword(password, user.passwordHash))) throw new Error('Invalid email or password.');
  return user;
}

export async function getUser(id: string) { return redisGetJson<User>(userKey(id)); }

export async function issuePhoneOtp(userId: string, phone: string) {
  if (!/^\+[1-9]\d{7,14}$/.test(phone)) throw new Error('Enter your phone number in international format.');
  const cooldown = await redisGetJson<number>(`otp:cooldown:${userId}`);
  if (cooldown && cooldown > Date.now()) throw new Error('Please wait before requesting another code.');
  const code = String(randomInt(0, 1000000)).padStart(6, '0');
  await redisSetJson(`otp:${userId}`, {hash: await hashOtp(code), phone, attempts: 0}, 600);
  await redisSetJson(`otp:cooldown:${userId}`, Date.now() + 60000, 60);
  await sendSms(phone, `Your Alvis verification code is ${code}. It expires in 10 minutes.`);
}

export async function verifyPhoneOtp(userId: string, code: string) {
  const record = await redisGetJson<{hash:string; phone:string; attempts:number}>(`otp:${userId}`);
  if (!record) throw new Error('This verification code has expired.');
  if (record.attempts >= 5) throw new Error('Too many attempts. Request a new code.');
  const ok = await verifyOtp(code, record.hash);
  if (!ok) {
    await redisSetJson(`otp:${userId}`, {...record, attempts: record.attempts + 1}, 600);
    throw new Error('Invalid verification code.');
  }
  const user = await getUser(userId);
  if (!user) throw new Error('Account not found.');
  await redisSetJson(userKey(userId), {...user, phone: record.phone, phoneVerified: true});
  await redisCommand('DEL', `otp:${userId}`);
}

async function sendSms(to: string, body: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID, auth = process.env.TWILIO_AUTH_TOKEN, from = process.env.TWILIO_FROM;
  if (!sid || !auth || !from) throw new Error('Phone verification is not configured yet.');
  const encoded = new URLSearchParams({To: to, From: from, Body: body});
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {method: 'POST', headers: {Authorization: `Basic ${Buffer.from(`${sid}:${auth}`).toString('base64')}`, 'Content-Type': 'application/x-www-form-urlencoded'}, body: encoded});
  if (!response.ok) throw new Error('Unable to send verification code.');
}
export async function requestPasswordReset(email:string){const normalized=validateConsumerEmail(email);const id=await redisGetJson<string>(emailKey(normalized));if(!id)return;const raw=randomBytes(32).toString('base64url');await redisSetJson(`pwreset:${createHash('sha256').update(raw).digest('hex')}`,{userId:id},900);await sendResetEmail(normalized,raw);}
export async function resetPassword(token:string,password:string){const key=createHash('sha256').update(token).digest('hex');const rec=await redisGetJson<{userId:string}>(`pwreset:${key}`);if(!rec)throw new Error('Reset link is invalid or expired.');const user=await getUser(rec.userId);if(!user)throw new Error('Account not found.');await redisSetJson(userKey(user.id),{...user,passwordHash:await hashPassword(password)});await redisCommand('DEL',`pwreset:${key}`);}
async function sendResetEmail(to:string,token:string){const key=process.env.RESEND_API_KEY,from=process.env.EMAIL_FROM;if(!key||!from)throw new Error('Email delivery is not configured.');const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from,to,subject:'Reset your Alvis password',text:`Reset your password at ${process.env.APP_URL}/auth/reset-password?token=${token}`})});if(!r.ok)throw new Error('Unable to send reset email.');}
