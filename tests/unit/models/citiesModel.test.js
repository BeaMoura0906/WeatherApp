// tests/unit/models/citiesModel.test.js

const citiesModel = require('../../../models/citiesModel');
const { openDb } = require('../../../database');

// Mocking the openDb function and the database methods
jest.mock('../../../database', () => {
    const mockDb = {
      all: jest.fn(),
      get: jest.fn(),
      run: jest.fn()
    };
    return {
      openDb: jest.fn(() => Promise.resolve(mockDb))
    };
});

// Create a mock database instance to use in the tests
let db;
beforeAll(() => {
    db = {
        all: jest.fn(),
        get: jest.fn(),
        run: jest.fn()
    };
    openDb.mockResolvedValue(db);
});

// Tests for the citiesModel
describe('citiesModel', () => {
    beforeEach(() => {
        db.all.mockReset();
        db.get.mockReset();
        db.run.mockReset();
    });

    // Test the getCities function
    describe('getCities', () => {
        it('should retrieve an array of cities', async () => {
            const mockCities = [{ id: 1, name: 'Paris', lat: 48.8566, lon: 2.3522 }];
            db.all.mockResolvedValue(mockCities);
            const cities = await citiesModel.getCities();
            expect(openDb).toHaveBeenCalled();
            expect(db.all).toHaveBeenCalledWith('SELECT * FROM cities');
            expect(cities).toEqual(mockCities);
        });
    });


    // Test the getCity function
    describe('getCityById', () => {
        it('should retrieve a city object by ID', async () => {
            const mockCity = { id: 1, name: 'Paris', lat: 48.8566, lon: 2.3522 };
            db.get.mockResolvedValue(mockCity);
            const city = await citiesModel.getCityById(1);
            expect(openDb).toHaveBeenCalled();
            expect(db.get).toHaveBeenCalledWith('SELECT * FROM cities WHERE id = ?', [1]);
            expect(city).toEqual(mockCity);
        });
    });

    // Test the searchCity function
    describe('searchCities', () => {
        it('should return an array of cities that match the query', async () => {
            const mockCities = [{ id: 2, name: 'Lyon', lat: 45.7640, lon: 4.8357 }];
            db.all.mockResolvedValue(mockCities);
            const results = await citiesModel.searchCities('Lyon');
            expect(openDb).toHaveBeenCalled();
            expect(db.all).toHaveBeenCalledWith('SELECT * FROM cities WHERE name LIKE ?', ['%Lyon%']);
            expect(results).toEqual(mockCities);
        });
    });

    // Test the addCity function
    describe('addCity', () => {
        it('should add a city to the database', async () => {
            const cityName = 'Nice';
            const cityLat = 43.7102;
            const cityLon = 7.2620;
            db.run.mockResolvedValue({ lastID: 3 });
            await citiesModel.addCity(cityName, cityLat, cityLon);
            expect(openDb).toHaveBeenCalled();
            expect(db.run).toHaveBeenCalledWith('INSERT INTO cities (name, lat, lon) VALUES (?, ?, ?)', [cityName, cityLat, cityLon]);
        });
    });

    // Test the deleteCity function
    describe('deleteCity', () => {
        it('should delete a city from the database by its ID', async () => {
            const cityId = 3;
            db.run.mockResolvedValue({ changes: 1 });
            await citiesModel.deleteCity(cityId);
            expect(openDb).toHaveBeenCalled();
            expect(db.run).toHaveBeenCalledWith('DELETE FROM cities WHERE id = ?', [cityId]);
        });
    });

});