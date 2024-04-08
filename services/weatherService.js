const axios = require('axios');

async function getWeatherForCity(lat, lon) {
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'WeatherApp' }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des informations météorologiques:', error);
        throw error;
    }
}

module.exports = { getWeatherForCity };