import {redirect} from '@remix-run/node';
import {destroySession} from '../../server/security/session';
import {clearSessionCookie} from '../../server/security/cookies';
export async function action({request}:{request:Request}){const raw=request.headers.get('Cookie')?.match(/alvis_session=([^;]+)/)?.[1] ?? null;await destroySession(raw);return redirect('/',{headers:{'Set-Cookie':clearSessionCookie()}});}export async function loader(){return redirect('/');}
export default function Logout(){return null;}
