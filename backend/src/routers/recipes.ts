import Router from './router.js';
import { Response } from 'express';
import UserRequest from '../types/Request.js';

import RecipeController from '../controllers/recipes.js';
import AuthenticateToken from '../middlewares/authenticate-token.js';

export class RecipeRouter extends Router {
  private controller: RecipeController;

  constructor() {
    super();
    this.controller = new RecipeController();
  }

  protected setRoutes(): void {

    this.router.use(AuthenticateToken);

    this.router.post('/', async (req: UserRequest, res: Response) => {
      this.controller.createRecipe(req, res);
    });
  }
}

export default RecipeRouter;
