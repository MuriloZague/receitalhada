import request from 'supertest';
import express, { Express } from 'express';

let app: Express;

beforeAll(() => {
    app = express();

    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Server is running!' });
    });
});

describe('GET /', () => {
    it('should return status 200 and a welcome message', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Server is running!');
    });
});
