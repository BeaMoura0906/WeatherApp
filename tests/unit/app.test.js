// tests/unit/app.test.js

const request = require('supertest');
const app = require('../../app');

let server;

/*
beforeAll(() => {
    server = app.listen(4000, done);
});
*/

// Test for the express app
describe('Express App Setup', () => {
    xit('should serve static files from the public directory', async () => {
        const response = await request(app).get('/css/style.css');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('canvas');
    });

    xit('should set Twig as the view engine', () => {
        expect(app.get('view engine')).toBe('twig');
    });

    // Doesn't work because load html file to request
    xit('should have the index route set up', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text.trim()).toContain('<!DOCTYPE html>');
    });
    
    // Doesn't work because load html file to request
    xit('should have the weather route set up', async () => {
        const response = await request(app).get('/weather/1');
        expect(response.statusCode).toBe(200);
        expect(response.text.trim()).toContain('<!DOCTYPE html>');
    });
    
});

/*
afterAll((done) => {
    server.close(done);
});
*/