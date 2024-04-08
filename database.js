const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

async function openDb() {
    return sqlite.open({
        filename: './data/weather_app.db',
        driver: sqlite3.Database
    });
}

module.exports = { openDb };