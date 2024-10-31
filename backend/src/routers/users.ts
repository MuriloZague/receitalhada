import Router from "./router.ts";
import { Request, Response } from "express";

import { prisma } from '../index.ts'
import { Users } from '@prisma/client';

class UserRouter extends Router {
    super() { }

    protected setRoutes(): void {
        // Colocar essa parte da função em um controller
        this.router.post('/', async (req: Request, res: Response) => {
            let userData: Users = req.body;

            try {
                const newUserData: Users = await prisma.users.create({
                    data: userData
                })

                res.status(201).json(newUserData);
            } catch (error) {
                res.status(500).json({ error: 'Error creating user', stack: error.message });
            }
        });
    }
}

export default UserRouter;