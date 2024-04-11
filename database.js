// database.js

// Import necessary module
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

let dbInstance;

async function openDb() {
    dbInstance = await sqlite.open({
        filename: './data/weather_app.db',
        driver: sqlite3.Database
    });
    return dbInstance;
}

async function closeDb() {
    if (dbInstance) await dbInstance.close();
}

module.exports = { openDb, closeDb };