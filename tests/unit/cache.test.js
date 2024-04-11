// tests/unit/cache.test.js

const { cacheData, getCachedData } = require('../../cache');

// Tests for the cache module
describe('cache', () => {
    const key = 'testKey';
    const data = { value: 'testData' };
    const ttl = 100;

    beforeEach(() => {
        cache = {};
    });
    
    // Test for the cacheData function
    describe('cacheData', () => {
        it('should cache the data', () => {
        cacheData(key, data, ttl);
        expect(getCachedData(key)).toEqual(data);
        });

        it('should expire the data', (done) => {
        cacheData(key, data, ttl);
        setTimeout(() => {
            expect(getCachedData(key)).toBeNull();
            done();
        }, ttl + 1);
        });
    });

    // Test for the getCachedData function
    describe('getCachedData', () => {
        it('should retrieve valid data from the cache', () => {
        cacheData(key, data, ttl);
        expect(getCachedData(key)).toEqual(data);
        });

        it('should return null for expired data', (done) => {
        cacheData(key, data, 1);
        setTimeout(() => {
            expect(getCachedData(key)).toBeNull();
            done();
        }, 2);
        });

        it('should remove data from the cache', (done) => {
        cacheData(key, data, 1);
        setTimeout(() => {
            getCachedData(key);
            expect(cache[key]).toBeUndefined();
            done();
        }, 2);
        });
    });
});
