// routes/index.js

const express = require("express");
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const { getCities, searchCities, addCity, deleteCity } = require('../models/citiesModel');

// Route for the index page displaying all cities
router.get('/', async (req, res, next) => {
    try {
        const cities = await getCities();
        res.render('index', { cities });
    } catch (err) {
        next(err);
    }
});

// Route for the search fonctionality
router.get('/search', async (req, res, next) => {
    const searchQuery = req.query.query;
    if (!searchQuery || searchQuery.trim() === '') {
        return res.redirect('/');
    }
    try {
        const cities = await searchCities(searchQuery);
        res.render('index', { cities, searchQuery });
    } catch (err) {
        next(err);
    }
});

// Route for adding a new city with validation of parameters
router.post('/add-city', [
    body('name').trim().escape(),
    body('lat').isFloat(),
    body('lon').isFloat()
], async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await addCity(req.body.name, parseFloat(req.body.lat), parseFloat(req.body.lon));
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

// Route for deleting a city with validation of parameters
router.get('/delete-city/:cityId', [
    param('cityId').isInt()
], async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await deleteCity(req.params.cityId);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

module.exports = router;