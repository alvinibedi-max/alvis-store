import {json} from '@remix-run/node';
import {redisCommand,redisGetJson} from '../../server/db/redis';
import {runSecureSourcing} from '../../server/sourcing-service/secureWorkflow';
export async function action({request}:{request:Request}){if(request.headers.get('Authorization')!==`Bearer ${process.env.CRON_SECRET}`)return json({error:'Unauthorized'},{status:401});const ids=await redisCommand<string[]>('SMEMBERS','sourcing:queue')||[];const results=[];for(const id of ids.slice(0,5)){try{const r=await runSecureSourcing(id);await redisCommand('SREM','sourcing:queue',id);results.push({id,ok:true,decision:r?.productDecision?.decision??null});}catch(e){results.push({id,ok:false,error:e instanceof Error?e.message:'Unknown error'});}}return json({processed:results});}
export async function loader(args:{request:Request}){return action(args);}
