import express, { Express, Request } from "express";

const app: Express = express();

app.get('/up', (req: Request, res: Response) => res.json({ message: 'Server is running!' }))

app.listen(3000, () => console.log('Server is runnig!'))
