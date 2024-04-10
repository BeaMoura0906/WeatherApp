// database.js

// Import necessary module
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

/**
 * Opens a connection to the database.
 *
 * @return {Promise} A Promise that resolves to a SQLite database connection.
 */
async function openDb() {
    return sqlite.open({
        filename: './data/weather_app.db',
        driver: sqlite3.Database
    });
}

module.exports = { openDb };