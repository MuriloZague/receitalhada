import dotenv from 'dotenv';
import express, { Express, Request, Response } from "express";

// Inicializa o uso de dotenv no arquivo
dotenv.config();

// Obtém a porta da API através do arquivo .env (padrão 3000)
const PORT = process.env.API_PORT ?? 3000;

// Cria instância do Express e declara o uso de json no servidor
const app: Express = express();
app.use(express.json());

// Rota para testar a conectividade da API
app.get('/up', (req: Request, res: Response) => {
    res.status(202).json({ message: "Server is up!" })
});

// Cria o servidor na porta passada e exibe o log
const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));

export { app, server };
