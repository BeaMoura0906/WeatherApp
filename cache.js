// cache.js

let cache = {};

/**
 * Caches the provided data with a specified key and time-to-live (TTL).
 *
 * @param {string} key - The key to cache the data with.
 * @param {any} data - The data to be cached.
 * @param {number} ttl - The time-to-live for the cached data in milliseconds.
 */
function cacheData(key, data, ttl) {
    const now = new Date().getTime();
    cache[key] = { data, timestamp: now + ttl };
}

/**
 * Retrieves cached data based on the provided key, and checks if the data is still valid.
 *
 * @param {string} key - The key used to retrieve the cached data
 * @return {object|null} The cached data, or null if the data is no longer valid
 */
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