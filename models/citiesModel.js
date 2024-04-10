// models/citiesModel.js

const { openDb } = require('../database');

/**
 * Retrieves all cities from the database.
 *
 * @return {Array} An array of city objects.
 */
async function getCities() {
    const db = await openDb();
    return db.all('SELECT * FROM cities');
}

/**
 * Retrieve a city from the database by its ID.
 *
 * @param {number} id - The ID of the city to retrieve.
 * @return {Object} The city object retrieved from the database.
 */
async function getCityById(id) {
    const db = await openDb();
    const city = await db.get('SELECT * FROM cities WHERE id = ?', [id]);
    return city;
}

/**
 * Search for cities in the database based on a query string.
 *
 * @param {string} query - The query string to search for.
 * @return {Array} An array of city objects matching the search query.
 */
async function searchCities(query) {
    const db = await openDb();
    const cities = await db.all(`SELECT * FROM cities WHERE name LIKE ?`, [`%${query}%`]);
    return cities;
}

/**
 * Async function to add a city to the database.
 *
 * @param {string} name - The name of the city
 * @param {number} lat - The latitude of the city
 * @param {number} lon - The longitude of the city
 */
async function addCity(name, lat, lon) {
    const db = await openDb();
    const sql = `INSERT INTO cities (name, lat, lon) VALUES (?, ?, ?)`;
    await db.run(sql, [name, lat, lon]);
}

/**
 * Deletes a city from the database by its ID.
 *
 * @param {number} id - The ID of the city to be deleted
 * @return {Promise<void>} A promise that resolves when the city is successfully deleted
 */
async function deleteCity(id) {
    const db = await openDb();
    const sql = `DELETE FROM cities WHERE id = ?`;
    await db.run(sql, [id]);
}

module.exports = { getCities, getCityById, searchCities, addCity, deleteCity };