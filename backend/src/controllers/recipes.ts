import Controller from './controller.js';
import { Response } from 'express';
import UserRequest from '../types/Request.js';

import { prisma } from '../index.js';
import { Recipes } from '@prisma/client';

// import { ErrorCode } from '../errors/errors.js';
// import AppError from '../errors/app-error.js';

class RecipeController extends Controller<Recipes> {
    constructor() {
        super();
    }

    public async createRecipe(req: UserRequest, res: Response): Promise<Response> {
        const data: Recipes = req.body;

        const result = await this.handler(async () => {
            this.validate(data);

            data.user_id = req.user.id_user;

            const recipe = await prisma.recipes.create({
                data,
                select: {
                    id_recipes: true,
                    title: true,
                    ingredients: true,
                    preparation_method: true,
                    observation: true,
                    createdAt: true,
                    category_id: true
                }
            });

            return recipe;
        });

        return this.handleResponse(res, result);
    }

    public validate(data: any) { }
}

export default RecipeController;
