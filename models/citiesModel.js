const { openDb } = require('../database');

async function getCities() {
    const db = await openDb();
    return db.all('SELECT * FROM cities');
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

module.exports = { getCities, searchCities, addCity }