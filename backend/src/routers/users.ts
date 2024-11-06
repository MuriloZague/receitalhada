import Router from './router.js';
import { Request, Response } from 'express';

import AuthenticateToken from '../middlewares/authenticate-token.js';

import UserController from '../controllers/users.js';
import UserRequest from '../types/Request.js';

class UserRouter extends Router {
  private controller: UserController;

  constructor() {
    super();
    this.controller = new UserController();
  }

  protected setRoutes(): void {
    this.router.post('/', async (req: Request, res: Response) => {
      this.controller.createUser(req, res);
    });
    this.router.post('/auth', async (req: Request, res: Response) => {
      this.controller.authenticateUser(req, res);
    });
    this.router.post('/email-auth', async (req: Request, res: Response) => {
      this.controller.authenticateEmailCode(req, res);
    });
    this.router.post(
      '/forgot-password',
      async (req: Request, res: Response) => {
        this.controller.sendForgotPasswordCode(req, res);
      },
    );
    this.router.post('/reset-password', async (req: Request, res: Response) => {
      this.controller.authenticateForgotPasswordCode(req, res);
    });

    this.router.use(AuthenticateToken);

    this.router.get('/', async (req: Request, res: Response) => {
      this.controller.listAllUsers(req, res);
    });
    this.router.get('/signed', async (req: UserRequest, res: Response) => {
      this.controller.listUserSigned(req, res);
    });
    this.router.get('/:id', async (req: UserRequest, res: Response) => {
      this.controller.listUserById(req, res);
    });
    this.router.patch('/', async (req: UserRequest, res: Response) => {
      this.controller.editUser(req, res);
    });
  }
}

export default UserRouter;
