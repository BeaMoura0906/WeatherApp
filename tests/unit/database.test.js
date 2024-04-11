// tests/unit/database.test.js

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const { openDb, closeDb } = require('../../database');

jest.mock('sqlite');

// Test for the openDb and closeDb functions
describe('Database Operations', () => {
	let mockDbInstance;

	beforeEach(() => {
		mockDbInstance = { close: jest.fn() };
		sqlite.open.mockResolvedValue(mockDbInstance);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	// Test for the openDb function
	it('should open a database connection', async () => {
		const db = await openDb();

		expect(sqlite.open).toHaveBeenCalledWith({
		filename: './data/weather_app.db',
		driver: sqlite3.Database
		});

		expect(db).toBe(mockDbInstance);
	});

	// Test for the closeDb function
	it('should close the database connection', async () => {
		await openDb();
		await closeDb();

		expect(mockDbInstance.close).toHaveBeenCalled();
	});
});
