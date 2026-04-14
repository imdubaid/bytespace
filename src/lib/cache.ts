type CacheEntry = {
    data: any;
    expires: number;
};

const cache = new Map<string, CacheEntry>();

export function setCache(key: string, data: any, ttlMs: number) {
    cache.set(key, {
        data,
        expires: Date.now() + ttlMs,
    });
}

export function getCache(key: string) {
    const entry = cache.get(key);

    if (!entry) return null;
    if (Date.now() > entry.expires) {
        cache.delete(key);
        return null;
    }

    return entry.data;
}

export function clearCache() {
    cache.clear();
}
