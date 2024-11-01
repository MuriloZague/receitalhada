import Router from "./router.js";
import { Request, Response } from "express";

import UserController from "../controllers/users.js";

class UserRouter extends Router {
    private controller: UserController;

    constructor() {
        super();
        this.controller = new UserController();
    }

    protected setRoutes(): void {
        this.router.get('/', async (req: Request, res: Response) => { this.controller.listAllUsers(req, res) });
        this.router.get('/:id', async (req: Request, res: Response) => { this.controller.listUserById(req, res) });
        this.router.post('/', async (req: Request, res: Response) => { this.controller.createUser(req, res) });
    }
}

export default UserRouter;