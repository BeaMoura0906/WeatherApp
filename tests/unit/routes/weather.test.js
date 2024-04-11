// tests/unit/routes/weather.test.js

const express = require('express');
const request = require('supertest');
const citiesModel = require('../../../models/citiesModel');
const weatherService = require('../../../services/weatherService');
const weatherRouter = require('../../../routes/weather');

jest.mock('../../../models/citiesModel');
jest.mock('../../../services/weatherService');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'twig');
app.set("views", __dirname + "/views");

// Mock res.render
app.use((req, res, next) => {
  res.render = jest.fn().mockImplementation((view, options) => {
    res.send({ view, options });
  });
  next();
});

app.use('/weather', weatherRouter);


// Test for the GET /weather/:cityId route
describe('GET /weather/:cityId', () => {
  it('should display the weather for a given city', async () => {
    const mockCity = { id: 1, name: 'Paris', lat: 48.8566, lon: 2.3522 };
    const mockWeatherData = {
        properties: {
          meta: { updated_at: '2023-04-14T10:00:00Z' },
          timeseries: [
            {
              time: new Date().toISOString(),
              data: {
                instant: { details: { air_temperature: 20, wind_speed: 3.6, wind_from_direction: 180, relative_humidity: 45, air_pressure_at_sea_level: 1015 } },
                next_1_hours: { summary: { symbol_code: 'clearsky_day' }, details: { precipitation_amount: 0 } }
              }
            }
          ]
        }
      };
      

    citiesModel.getCityById.mockResolvedValue(mockCity);
    weatherService.getWeatherForCity.mockResolvedValue(mockWeatherData);

    const response = await request(app).get('/weather/1');

    expect(response.statusCode).toBe(200);
    expect(response.body.view).toBe('weather');
    expect(response.body.options.city).toEqual(mockCity);
    expect(response.body.options.weather.forecasts).toHaveLength(1);
    expect(response.body.options.weatherJSON).toContain('clearsky_day');
  });

  it('should return an error if the weather information cannot be retrieved', async () => {
    citiesModel.getCityById.mockResolvedValue({ id: 1, name: 'Paris', lat: 48.8566, lon: 2.3522 });
    weatherService.getWeatherForCity.mockRejectedValue(new Error('Failed to fetch weather data'));

    const response = await request(app).get('/weather/1');

    expect(response.statusCode).toBe(500);
    expect(response.text).toContain('Erreur lors de l\'affichage des informations météorologiques.');
  });
});
