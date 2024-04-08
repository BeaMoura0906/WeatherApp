const axios = require('axios');
const cache = require('../cache');

async function getWeatherForCity(lat, lon) {
    const cacheKey = `weather_${lat}_${lon}`;
    try {
        const cachedData = cache.getCachedData(cacheKey);
        if (cachedData) {
            console.log('Données récupérées du cache');
            const weather = JSON.parse(cachedData);
            return weather;
        } else {
            console.log('Données récupérées de l\'API');
        }
    } catch (error) {
        console.error('Erreur lors de la recherche du cache:', error);
    }

    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

    try {    
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'WeatherApp' }
        });

        try {
            cache.cacheData(cacheKey, JSON.stringify(response.data), 3600 * 1000);
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement du cache:', error);
        }

        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des informations météorologiques:', error);
        throw error;
    }
}

module.exports = { getWeatherForCity };