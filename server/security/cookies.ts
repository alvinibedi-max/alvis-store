import {SESSION_COOKIE} from './session';
export function sessionCookie(value: string, expires: Date) {
  return `${SESSION_COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=${expires.toUTCString()}`;
}
export function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}
