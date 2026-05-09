import { Redis, RedisOptions } from "ioredis";
import * as dotenv from "dotenv";

dotenv.config();

const baseRedisOptions: RedisOptions = {
    host:             process.env.REDIS_HOST     || "127.0.0.1",
    port:             Number(process.env.REDIS_PORT) || 6379,
    password:         process.env.REDIS_PASSWORD || undefined,
    connectTimeout:   Number(process.env.REDIS_CONNECTION_TIMEOUT) || 10000,
    lazyConnect:      true,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    retryStrategy(times: number) {
        if (times > 3) {
            console.warn("[Redis] Unavailable after 3 retries. Continuing without Redis.");
            return null;
        }
        return Math.min(times * 200, 2000);
    },
};


// For general-purpose commands (cache, rate-limit, session, etc.)
export const redisMainConfig: RedisOptions = {
    ...baseRedisOptions,
    keyPrefix: process.env.REDIS_PREFIX || "v1:",
};

export const redisClient = new Redis(redisMainConfig);

redisClient.on("error",   (error) => console.warn("[Redis] Main client error:", error.message));
redisClient.on("connect", ()      => console.log("[Redis] Connected successfully."));


// For Pub/Sub publisher client.
export const redisPubConfig: RedisOptions = {
    ...baseRedisOptions,
};


// For Pub/Sub subscriber client.
export const redisSubConfig: RedisOptions = {
    ...baseRedisOptions,
};


/** Helper to create fresh instances e.g. for pub/sub or specific tasks */
export const createRedisClient = (overrides: Partial<RedisOptions> = {}): Redis => {
    return new Redis({ ...baseRedisOptions, ...overrides });
};
