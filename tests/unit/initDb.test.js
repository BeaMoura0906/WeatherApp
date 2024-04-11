// tests/unit/initDb.test.js
const { openDb } = require('../../database');
const initDb = require('../../initDb');

jest.mock('../../database', () => ({
  openDb: jest.fn()
}));

// Test for the initDb function
describe('initDb', () => {
  it('should initialize the database with the cities table', async () => {
		// Mock the exec and close methods on the database object
		const mockExec = jest.fn();
		const mockClose = jest.fn();

		// Mock the openDb function to resolve with an object that includes the mock methods
		openDb.mockResolvedValue({
		exec: mockExec,
		close: mockClose
		});

		// Call the initDb function which should use the mocked openDb
		await initDb();

		// Verify openDb was called to open the database
		expect(openDb).toHaveBeenCalled();

		// Verify exec was called with the SQL command to create the cities table
		expect(mockExec).toHaveBeenCalledWith(`CREATE TABLE IF NOT EXISTS cities ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,lat REAL NOT NULL, lon REAL NOT NULL)`);

		// Verify close was called to close the database
		expect(mockClose).toHaveBeenCalled();
	});
});
