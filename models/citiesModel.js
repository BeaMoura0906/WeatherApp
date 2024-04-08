const { openDb } = require('../database');

async function getCities() {
    const db = await openDb();
    return db.all('SELECT * FROM cities');
}

async function getCityById(id) {
    const db = await openDb();
    const city = await db.get('SELECT * FROM cities WHERE id = ?', [id]);
    return city;
}

async function searchCities(query) {
    const db = await openDb();
    const cities = await db.all(`SELECT * FROM cities WHERE name LIKE ?`, [`%${query}%`]);
    return cities;
}

async function addCity(name, lat, lon) {
    const db = await openDb();
    const sql = `INSERT INTO cities (name, lat, lon) VALUES (?, ?, ?)`;
    await db.run(sql, [name, lat, lon]);
}

module.exports = { getCities, getCityById, searchCities, addCity }