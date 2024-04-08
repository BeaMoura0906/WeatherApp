const express = require("express");
const router = express.Router();
const { getCityById } = require("../models/citiesModel");
const { getWeatherForCity } = require("../services/weatherService");

router.get('/:cityId', async (req, res) => {
    try {
        const city = await getCityById(req.params.cityId);
        const weather = await getWeatherForCity(city.lat, city.lon);
        res.render('weather', { city, weather });
        console.log(city, weather);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de l\'affichage des informations météorologiques.');
    }
});

module.exports = router;