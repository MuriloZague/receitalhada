import request from 'supertest';
import { describe, it, afterAll, expect } from 'vitest';
import { app, server } from '../../src/index.js';

// Define a descrição da sessão
describe('GET /', () => {
    it('should return status 202 and a server is up message', async () => {
        // Aguarda a resposta da rota "/up"
        const response = await request(app).get('/up');
        // Espera que o status seja 202
        expect(response.status).toBe(202);
        // Espera que a mensagem seja a de "up"
        expect(response.body.message).toBe('Server is up!');
    });
});

afterAll(() => {
    // Depois de todos testes, fecha o servidor
    server.close();
});