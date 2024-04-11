// tests/unit/routes/index.test.js

const request = require('supertest');
const express = require('express');
const citiesModel = require('../../../models/citiesModel');
const indexRouter = require('../../../routes/index');

jest.mock('../../../models/citiesModel');

const app = express();
app.use(express.urlencoded({ extended: false }));

// Mock res.render
app.use((req, res, next) => {
    res.render = jest.fn().mockImplementation((view, options) => {
      res.send({ view, options });
    });
    next();
});

app.use('/', indexRouter);

// Test for the GET / route
describe('GET /', () => {
    it('should display all cities', async () => {
        const mockCities = [{ id: 1, name: 'Paris', lat: 48.8566, lon: 2.3522 }];
        citiesModel.getCities.mockResolvedValue(mockCities);
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Paris');
    });
});

// Test for the GET /search route
describe('GET /search', () => {
    it('should redirect to home page if search query is empty', async () => {
        const response = await request(app).get('/search');
        expect(response.statusCode).toBe(302); 
        expect(response.headers.location).toBe('/');
    });

    it('should display cities that match the search query', async () => {
        const mockCities = [{ id: 1, name: 'Paris', lat: 48.8566, lon: 2.3522 }];
        citiesModel.searchCities.mockResolvedValue(mockCities);
    
        const response = await request(app).get('/search?query=Lyon');
    
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Paris');
    });
});

// Test for the POST /add-city route
describe('POST /add-city', () => {
    it('should add a city and redirect to home page', async () => {
        citiesModel.addCity.mockResolvedValue({});
    
        const response = await request(app)
            .post('/add-city')
            .type('form')
            .send('name=New City&lat=48.8566&lon=2.3522');
    
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/');
        expect(citiesModel.addCity).toHaveBeenCalledWith('New City', 48.8566, 2.3522);
    });
});

// Test for the GET /delete-city/:cityId route
describe('GET /delete-city/:cityId', () => {
    it('should delete a city and redirect to home page', async () => {
        citiesModel.deleteCity.mockResolvedValue({});
    
        const response = await request(app).get('/delete-city/1');
    
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/');
        expect(citiesModel.deleteCity).toHaveBeenCalledWith("1");
    });
});
    