import {randomBytes, createHash} from 'node:crypto';
import {redisGetJson, redisSetJson, redisCommand} from '../db/redis';

export type Session = {idHash: string; userId: string; createdAt: string; expiresAt: string; lastSeenAt: string};
const SESSION_DAYS = 14;
const hash = (value: string) => createHash('sha256').update(value).digest('hex');

export async function createSession(userId: string) {
  const raw = randomBytes(32).toString('base64url');
  const now = new Date();
  const expires = new Date(now.getTime() + SESSION_DAYS * 86400000);
  const session: Session = {idHash: hash(raw), userId, createdAt: now.toISOString(), expiresAt: expires.toISOString(), lastSeenAt: now.toISOString()};
  await redisSetJson(`session:${session.idHash}`, session, SESSION_DAYS * 86400);
  return {raw, expiresAt: expires};
}

export async function getSession(raw: string | null) {
  if (!raw) return null;
  const session = await redisGetJson<Session>(`session:${hash(raw)}`);
  if (!session || Date.parse(session.expiresAt) <= Date.now()) return null;
  await redisSetJson(`session:${session.idHash}`, {...session, lastSeenAt: new Date().toISOString()}, SESSION_DAYS * 86400);
  return session;
}

export async function destroySession(raw: string | null) {
  if (raw) await redisCommand('DEL', `session:${hash(raw)}`);
}

export const SESSION_COOKIE = 'alvis_session';
