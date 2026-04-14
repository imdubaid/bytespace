import 'server-only';
import Redis from 'ioredis';

function getRedisUrl() {
    const url = process.env.REDIS_URL!;
    if (!url) {
        const errorMsg = '[redis] FATAL: REDIS_URL environment variable is not defined';
        console.error(errorMsg);
        // Write to stderr to ensure it appears in Docker logs

        throw new Error('REDIS_URL is not defined');
    }
    return url;
}

declare global {
    var redis: Redis | undefined;
    var redisReady: boolean | undefined;
}

function createRedisClient() {
    const url = getRedisUrl();

    console.log('[redis] Attempting connection to:', url);
    // Force output to stderr for Docker logs visibility

    const client = new Redis(url, {
        maxRetriesPerRequest: 3,
        // Enable ready check to ensure connection is established
        enableReadyCheck: true,
        // Increase connection timeout for slower VPS networks
        connectTimeout: 10000,
        // Enable offline queue to buffer commands during reconnection
        enableOfflineQueue: true,
        // Retry strategy with exponential backoff
        retryStrategy(times) {
            const delay = Math.min(times * 100, 3000);
            console.log(`[redis] Retry attempt ${times}, waiting ${delay}ms`);

            // Stop retrying after 10 attempts
            if (times > 10) {
                console.error('[redis] Max retry attempts reached, giving up');

                return null;
            }

            return delay;
        },
        // Reconnect on error
        reconnectOnError(err) {
            console.error('[redis] Reconnect on error:', err.message);

            return true;
        },
        // Add these for better network compatibility
        family: 4, // Force IPv4 (Rocky Linux might prefer IPv6)
        keepAlive: 30000, // Keep connection alive
        lazyConnect: false, // Connect immediately
    });

    client.on('connect', () => {
        console.log('[redis] ✓ TCP connection established');
    });

    client.on('ready', () => {
        console.log('[redis] ✓ Client is ready to process commands');

        global.redisReady = true;
    });

    client.on('error', err => {
        console.error('[redis] ✗ Error:', err.message);
        console.error('[redis] Full error:', err);

        global.redisReady = false;
    });

    client.on('close', () => {
        console.log('[redis] Connection closed');

        global.redisReady = false;
    });

    client.on('reconnecting', (delay: number) => {
        console.log(`[redis] Reconnecting in ${delay}ms...`);
    });

    client.on('end', () => {
        console.log('[redis] Connection ended permanently');

        global.redisReady = false;
    });

    return client;
}

export default function getRedis() {
    if (!global.redis) {
        global.redis = createRedisClient();
    }
    return global.redis;
}

// Health check function for debugging
export async function checkRedisHealth(): Promise<{ connected: boolean; error?: string }> {
    try {
        const redis = getRedis();
        await redis.ping();
        return { connected: true };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('[redis] Health check failed:', errorMessage);

        return { connected: false, error: errorMessage };
    }
}
