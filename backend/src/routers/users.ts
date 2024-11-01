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
        this.router.post('/', async (req: Request, res: Response) => { this.controller.createUser(req, res) });
    }
}

export default UserRouter;