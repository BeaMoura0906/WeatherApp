let cache = {};

function cacheData(key, data, ttl) {
    const now = new Date().getTime();
    cache[key] = { data, timestamp: now + ttl };
}

function getCachedData(key) {
    const cachedEntry = cache[key];
    if (!cachedEntry) {
        return null;
    }

    const now = new Date().getTime();

    if (now < cachedEntry.timestamp) {
        return cachedEntry.data;
    }

    delete cache[key];
    return null;
}

module.exports = { cacheData, getCachedData };