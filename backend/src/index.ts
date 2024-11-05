import dotenv from 'dotenv';
import express, { Express, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import UserRouter from './routers/users.js';

// Inicializa o uso de dotenv no arquivo
dotenv.config();

// Cria instância do Express
const app: Express = express();
// Cria instância do PrismaClient
const prisma = new PrismaClient();

// Declara o uso de json no servidor
app.use(express.json());

// Rota para testar a conectividade da API
app.get('/up', (res: Response) => {
  res.status(202).json({ message: 'Server is up!' });
});

// Rotas de usuários
const usersRouter = new UserRouter();
app.use('/users', usersRouter.getRoutes());

// Obtém a porta da API através do arquivo .env (padrão 3000)
const PORT = process.env.API_PORT ?? 3000;

// Cria o servidor na porta passada e exibe o log
const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}!`),
);

// Exporta as instâncias do app, server e prisma
export { app, server, prisma };
