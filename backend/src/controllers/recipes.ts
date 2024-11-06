import Controller from './controller.js';
import { Response } from 'express';
import UserRequest from '../types/Request.js';

import { prisma } from '../index.js';
import { Recipes } from '@prisma/client';

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

    public async listAllRecipes(req: UserRequest, res: Response): Promise<Response> {
        const { page = 1, limit = 10 } = req.query;

        const pageNumber = Number(page);
        const take = Number(limit);
        const skip = (pageNumber - 1) * take;

        const result = await this.handler(async () => {
            const recipes = await prisma.recipes.findMany({
                select: {
                    id_recipes: true,
                    title: true,
                    User: {
                        select: {
                            id_user: true,
                            name: true,
                            username: true,
                            img_url: true,
                        }
                    },
                    Favorites: {
                        where: { user_id: req.user?.id_user ?? 0 },
                        select: {
                            id_favorite: true,
                        },
                    },
                    createdAt: true,
                },
                skip,
                take,
            });

            const recipesWithAggregate = await Promise.all(recipes.map(async (recipe) => {
                const aggregateRatings = await prisma.ratings.aggregate({
                    where: { recipe_id: recipe.id_recipes },
                    _avg: { rating_value: true },
                });

                const aggregateFavorites = await prisma.favorites.aggregate({
                    where: { recipe_id: recipe.id_recipes },
                    _count: { id_favorite: true },
                });

                return {
                    ...recipe,
                    avg_rating: aggregateRatings._avg.rating_value ?? 0,
                    total_favorites: aggregateFavorites._count.id_favorite ?? 0,
                };
            }));

            const totalRecipes = await prisma.recipes.count();

            return {
                recipes: recipesWithAggregate,
                total: totalRecipes,
                page: pageNumber,
                lastPage: Math.ceil(totalRecipes / take),
            };
        });

        return this.handleResponse(res, result);
    }

    public async listRecipeById(
        req: UserRequest,
        res: Response,
    ): Promise<Response> {
        const id_recipes: number = Number(req.params.id);

        const result = await this.handler(async () => {
            const recipe = await prisma.recipes.findUniqueOrThrow({
                include: {
                    User: {
                        select: {
                            id_user: true,
                            name: true,
                            username: true,
                            img_url: true,
                            Admins: true,
                        }
                    },
                    Ratings: {
                        where: { user_id: req.user?.id_user ?? 0 },
                        select: {
                            rating_value: true,
                        },
                    },
                    Favorites: {
                        where: { user_id: req.user?.id_user ?? 0 },
                        select: {
                            id_favorite: true,
                        },
                    },
                    Categories: true,
                    Comments: true,
                },
                where: { id_recipes },
            });

            const aggregateRatings = await prisma.ratings.aggregate({
                where: { recipe_id: id_recipes },
                _avg: { rating_value: true },
                _count: { id_rating: true },
            });

            const aggregateFavorites = await prisma.favorites.aggregate({
                where: { recipe_id: id_recipes },
                _count: { id_favorite: true },
            });

            return {
                ...recipe,
                avg_rating: aggregateRatings._avg.rating_value ?? 0,
                total_ratings: aggregateRatings._count.id_rating ?? 0,
                total_favorites: aggregateFavorites._count.id_favorite ?? 0,
            };
        });

        return this.handleResponse(res, result);
    }


    public validate(data: any) { }
}

export default RecipeController;
