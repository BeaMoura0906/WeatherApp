// routes/weather.js

const express = require("express");
const router = express.Router();
const { validationResult, param } = require("express-validator");
const { getCityById } = require("../models/citiesModel");
const { getWeatherForCity } = require("../services/weatherService");

/**
 * Processes the weather data to filter and extract hourly forecasts within a specific time range.
 *
 * @param {Object} weatherData - the weather data to be processed
 * @return {Array} the array of hourly forecasts within the specified time range
 */
const processWeatherData = (weatherData) => {
	const forecasts = [];
	const currentTime = new Date();
	const startTime = new Date(currentTime);
	startTime.setHours(0, 0, 0, 0);

	let endTime = new Date(startTime);
	if ( currentTime.getHours() >= 16 ) {
		endTime.setDate(endTime.getDate() + 1);
		endTime.setHours(12, 0, 0, 0);
	} else {
		endTime.setDate(endTime.getDate() + 1);
	}

	for (let forecast of weatherData.properties.timeseries) {
		const forecastTime = new Date(forecast.time);
		if (forecastTime >= startTime && forecastTime < endTime) {
			const hourlyForecast = {
				time: forecast.time,
				temperature: forecast.data.instant.details.air_temperature,
				conditions: forecast.data.next_1_hours ? forecast.data.next_1_hours.summary.symbol_code : 'Unavailable',
				precipitation: forecast.data.next_1_hours ? forecast.data.next_1_hours.details.precipitation_amount : '0',
				wind_speed: forecast.data.instant.details.wind_speed,
				wind_direction: forecast.data.instant.details.wind_from_direction,
				humidity: forecast.data.instant.details.relative_humidity,
				pressure: forecast.data.instant.details.air_pressure_at_sea_level
			};
			forecasts.push(hourlyForecast);
		}
	}

	return forecasts;
};

// Route for the weather page displaying the weather forcasts for a given city with validation of parameters
router.get('/:cityId', [
	param('cityId').isInt()
], async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const city = await getCityById(req.params.cityId);
		const weather = await getWeatherForCity(city.lat, city.lon);

		const updatedAt = weather.properties.meta.updated_at;

		const processedWeather  = processWeatherData(weather);

		const weatherJSON = JSON.stringify(processedWeather);

		res.render('weather', { city, weather: { forecasts: processedWeather, updatedAt}, weatherJSON });
		console.log(city, weather, weatherJSON);
	} catch (err) {
		next(err);
	}
});

module.exports = router;