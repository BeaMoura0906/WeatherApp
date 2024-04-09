const express = require("express");
const router = express.Router();
const { getCities, searchCities, addCity, deleteCity } = require('../models/citiesModel');

router.get('/', async (req, res) => {
    try {
        const cities = await getCities();
        res.render('index', { cities });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération des villes.');
    }
});

router.get('/search', async (req, res) => {
    const searchQuery = req.query.query;
    if (!searchQuery || searchQuery.trim() === '') {
        return res.redirect('/');
    }
    try {
        const cities = await searchCities(searchQuery);
        res.render('index', { cities, searchQuery });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la recherche des villes.');
    }
});

router.post('/add-city', async (req, res) => {
    try {
        await addCity(req.body.name, parseFloat(req.body.lat), parseFloat(req.body.lon));
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de l\'ajout de la ville.');
    }
});

router.get('/delete-city/:cityId', async (req, res) => {
    try {
        await deleteCity(req.params.cityId);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la suppression de la ville.');
    }
});

module.exports = router;