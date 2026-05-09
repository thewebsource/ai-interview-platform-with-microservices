import { redisClient } from "./redisClient";


// ─── Core Cache Operations ───────────────────────────────────────────────────
export const setCache = async (key: string, value: unknown, ttl = 3600): Promise<boolean> => {
  try {
    await redisClient.set(key, JSON.stringify(value), "EX", ttl);
    return true;
  } catch (error) {
    console.error(`[Cache] Failed to set key "${key}":`, error);
    return false;
  }
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await redisClient.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`[Cache] Failed to get key "${key}":`, error);
    return null;
  }
};

export const deleteCache = async (key: string): Promise<boolean> => {
  try {
    const result = await redisClient.del(key);
    return result > 0;
  } catch (error) {
    console.error(`[Cache] Failed to delete key "${key}":`, error);
    return false;
  }
};

/** Check if a key exists without fetching its value */
export const hasCache = async (key: string): Promise<boolean> => {
  try {
    const result = await redisClient.exists(key);
    return result === 1;
  } catch (error) {
    console.error(`[Cache] Failed to check existence of key "${key}":`, error);
    return false;
  }
};

/** Delete all keys matching a pattern e.g. "user:*" */
export const deleteCacheByPattern = async (pattern: string): Promise<number> => {
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length === 0) return 0;
    return await redisClient.del(...keys);
  } catch (error) {
    console.error(`[Cache] Failed to delete keys for pattern "${pattern}":`, error);
    return 0;
  }
};


/** Refresh TTL on an existing key without changing its value */
export const refreshCacheTTL = async (key: string, ttl = 3600): Promise<boolean> => {
  try {
    const result = await redisClient.expire(key, ttl);
    return result === 1; // returns false if key doesn't exist
  } catch (error) {
    console.error(`[Cache] Failed to refresh TTL for key "${key}":`, error);
    return false;
  }
};


/**
 * Get a cached value — if missing, compute it via `fetchFn`,
 * store it, and return it. Classic cache-aside pattern.
 */
export const getOrSetCache = async <T>(key: string, fetchFn: () => Promise<T>, ttl = 3600): Promise<T> => {
  const cached = await getCache<T>(key);
  if (cached !== null) return cached;
  const fresh = await fetchFn();
  await setCache(key, fresh, ttl);
  return fresh;
};
