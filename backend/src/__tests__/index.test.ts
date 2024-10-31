import request from 'supertest';
import { app, server } from '../index';

// Define a descrição da sessão
describe('GET /', () => {
    // Deve retornar código 202 e que o servidor mostre a mensagem de "up"
    it('should return status 202 and a server is up message', async () => {
        // Aguarda a resposta da rota "/up"
        const response = await request(app).get('/up');
        // Espera que o status seja 202
        expect(response.status).toBe(202);
        // Espera que a mensagem seja a de "up"
        expect(response.body.message).toBe('Server is up!');
    });
});

afterAll((done) => {
    // Depois de todos testes, fecha o servidor
    server.close(done);
});