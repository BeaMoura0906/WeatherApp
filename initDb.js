// initDb.js

const { openDb } = require('./database');

/**
 * Initializes the database by creating a table for cities if it does not already exist.
 *
 * @return {Promise<void>} Promise that resolves once the database initialization is complete.
 */
async function initDb() {
    const db = await openDb();
    await db.exec(`CREATE TABLE IF NOT EXISTS cities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        lat REAL NOT NULL,
        lon REAL NOT NULL
    )`);
    console.log('La base de données a été initialisée avec la table des villes.');
}

if (require.main === module) {
    initDb().catch(console.error);
}

module.exports = initDb;