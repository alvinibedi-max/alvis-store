import {randomBytes} from 'node:crypto';
import {redisCommand,redisSetJson} from './db/redis';
export async function audit(event:{actor:string;action:string;entityType:string;entityId:string;detail:any}){const id=`aud_${randomBytes(10).toString('hex')}`;const row={id,...event,createdAt:new Date().toISOString()};await redisSetJson(`audit:${id}`,row);await redisCommand('SADD','audit',id);return row;}
