import request from 'supertest';
import app from '../src/app';

describe('Health Check Tests', () => {
    test('GET /health debe retornar 200 OK', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'ok');
    });

    test('GET / debe retornar mensaje de bienvenida', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });
});