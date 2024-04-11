// tests/services/weatherService.test.js

const axios = require('axios');
const cache = require('../../../cache');
const { getWeatherForCity } = require('../../../services/weatherService');

// Mocking the axios and cache module
jest.mock('axios');
jest.mock('../../../cache');

// Tests for the getWeatherForCity function
describe('getWeatherForCity', () => {
    const lat = 48.8566;
    const lon = 2.3522;
    const cacheKey = `weather_${lat}_${lon}`;
    const mockWeatherData = { data: { weather: "Clear sky" } };
    
    beforeEach(() => {
        cache.getCachedData.mockClear();
        cache.cacheData.mockClear();
        axios.get.mockClear();
    });

    // Test case for when the cache is empty and data needs to be fetched from the API
    it('should fetch weather data from API when cache is empty', async () => {
        cache.getCachedData.mockReturnValueOnce(null);
        axios.get.mockResolvedValue(mockWeatherData);

        const data = await getWeatherForCity(lat, lon);

        expect(cache.getCachedData).toHaveBeenCalledWith(cacheKey);
        expect(axios.get).toHaveBeenCalled();
        expect(cache.cacheData).toHaveBeenCalledWith(cacheKey, JSON.stringify(mockWeatherData.data), 3600 * 1000);
        expect(data).toEqual(mockWeatherData.data);
    });

    // Test case for when the data is available in the cache
    it('should fetch weather data from cache when available', async () => {
        cache.getCachedData.mockReturnValueOnce(JSON.stringify(mockWeatherData.data));

        const data = await getWeatherForCity(lat, lon);

        expect(cache.getCachedData).toHaveBeenCalledWith(cacheKey);
        expect(axios.get).not.toHaveBeenCalled();
        expect(data).toEqual(mockWeatherData.data);
    });
})