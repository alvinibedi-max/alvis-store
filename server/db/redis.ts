/** Minimal Upstash Redis REST client. Alvis deliberately fails closed when persistence is not configured. */
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

function requireConfig() {
  if (!url || !token) throw new Error('Durable persistence is not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.');
}

export async function redisCommand<T = unknown>(...command: (string | number)[]): Promise<T> {
  requireConfig();
  const response = await fetch(url!, {
    method: 'POST',
    headers: {'Authorization': `Bearer ${token!}`, 'Content-Type': 'application/json'},
    body: JSON.stringify(command.map(String)),
  });
  if (!response.ok) throw new Error(`Persistence request failed (${response.status}).`);
  const payload = await response.json() as {result: T};
  return payload.result;
}

export async function redisSetJson<T>(key: string, value: T, ttlSeconds?: number) {
  const encoded = JSON.stringify(value);
  if (ttlSeconds) return redisCommand('SET', key, encoded, 'EX', ttlSeconds);
  return redisCommand('SET', key, encoded);
}

export async function redisGetJson<T>(key: string): Promise<T | null> {
  const raw = await redisCommand<string | null>('GET', key);
  return raw ? JSON.parse(raw) as T : null;
}
