import Router from "./router.js";
import { Request, Response } from "express";

import AuthenticateToken from "../middlewares/authenticate-token.js";

import UserController from "../controllers/users.js";
// import UserRequest from "../types/Request.js";

class UserRouter extends Router {
    private controller: UserController;

    constructor() {
        super();
        this.controller = new UserController();
    }

    protected setRoutes(): void {
        this.router.post('/', async (req: Request, res: Response) => { this.controller.createUser(req, res) });

        this.router.use(AuthenticateToken);

        this.router.get('/', async (req: Request, res: Response) => { this.controller.listAllUsers(req, res) });
        this.router.get('/:id', async (req: Request, res: Response) => { this.controller.listUserById(req, res) });
        this.router.post('/auth', async (req: Request, res: Response) => { this.controller.authUser(req, res) });
    }
}

export default UserRouter;