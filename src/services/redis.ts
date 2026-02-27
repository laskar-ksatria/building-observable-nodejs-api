import Redis from "ioredis";
import env from "../env";
import HttpError, { errorStates } from "../errors";

/** Cache key for user profile (by user id). */
export const CACHE_USER = (id: string) => `user:${id}`;

const USER_CACHE_TTL_SEC = 60;

/**
 * Redis is optional. If REDIS_HOST is not set, cache is skipped.
 * Local: brew services start redis | brew services stop redis
 */
class RedisClient {
  private static instance: Redis | null = null;
  private static _enabled = false;

  public static isRedisAvailable(): boolean {
    return this._enabled;
  }

  public static getInstance(): Redis | null {
    if (this.instance !== null) return this.instance;
    if (!env.REDIS_HOST || env.REDIS_HOST === "") return null;

    try {
      this.instance = new Redis({
        host: env.REDIS_HOST,
        port: Number(env.REDIS_PORT) || 6379,
        password: env.REDIS_PASSWORD || undefined,
      });
      this._enabled = true;
      this.instance.on("error", (err) => console.error("Redis error:", err));
      return this.instance;
    } catch {
      return null;
    }
  }
}

export const setCache = async (
  key: string,
  value: string,
  expirySeconds: number = USER_CACHE_TTL_SEC,
): Promise<void> => {
  const redis = RedisClient.getInstance();
  if (!redis) return;
  try {
    await redis.set(key, value, "EX", expirySeconds);
  } catch (error) {
    console.error("Redis setCache error:", error);
    // Don't throw — cache miss is acceptable; app continues without cache
  }
};

export const getCache = async (key: string): Promise<string | null> => {
  const redis = RedisClient.getInstance();
  if (!redis) return null;
  try {
    return await redis.get(key);
  } catch (error) {
    console.error("Redis getCache error:", error);
    return null;
  }
};

export const deleteCache = async (key: string): Promise<void> => {
  const redis = RedisClient.getInstance();
  if (!redis) return;
  try {
    await redis.del(key);
  } catch (error) {
    console.error("Redis deleteCache error:", error);
  }
};
