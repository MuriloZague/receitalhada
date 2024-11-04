import Controller from './controller.js';
import { Request, Response } from "express";

import { prisma } from '../index.js';
import { Prisma, Users } from '@prisma/client';

import { ErrorCode } from '../errors/errors.js';
import AppError from '../errors/app-error.js';

import { isValidDDD } from '../utils/phone.js';

class UserController extends Controller<Users> {
    constructor() { super(); }

    public async createUser(req: Request, res: Response): Promise<Response> {
        let data: Users = req.body;

        const result = await this.handler(async () => {
            this.validate(data);

            const user = await prisma.users.create({ data });
            return user;
        })

        return this.handleResponse(res, result)
    }

    public async listUserById(req: Request, res: Response): Promise<Response> {
        let id_user: number = Number(req.params.id) ?? 0;

        const result = await this.handler(async () => {
            const user = await prisma.users.findUniqueOrThrow({ where: { id_user } });
            return user;
        })

        return this.handleResponse(res, result)
    }

    public async listAllUsers(req: Request, res: Response): Promise<Response> {
        // Cria um array com os campos do modelo
        const fields = Object.values(Prisma.UsersScalarFieldEnum) as string[];

        // Obtém os possíveis query parameters
        const { page = 1, limit = 10, order } = req.query;

        // Obtém o número da página, o limite e a quantidade de campos a pular
        const pageNumber = Number(page);
        const take = Number(limit);
        const skip = (pageNumber - 1) * take;

        // Separa o campo e a direção para ordenar
        const orderBy = [];
        let [orderField, orderDirection]: string[] = (order as string).toLowerCase().split(";");

        const result = await this.handler(async () => {
            // Se informou ordem
            if (order)
                // O campo precisa fazer parte dos campos da model
                if (fields.includes(orderField)) {
                    if (!(['asc', 'desc'].includes(orderDirection)))
                        orderDirection = 'asc';

                    // Monta string com o campo e a direção (padrão: asc)
                    const orderString = JSON.parse(`{"${orderField}": "${orderDirection}"}`);
                    orderBy.push(orderString);
                } else {
                    throw new AppError(`The property "${orderField}" does not exist in the model`, ErrorCode.VALIDATION_ERROR);
                }

            const users = await prisma.users.findMany({ skip, take, orderBy });
            const totalUsers = await prisma.users.count();
            return {
                users,
                total: totalUsers,
                page: pageNumber,
                lastPage: Math.ceil(totalUsers / take),
            };
        });

        return this.handleResponse(res, result);
    }

    public validate(data: Users) {
        // Verifica formato do email
        const emailSplited: string[] = data.email.split('@');
        if (emailSplited.length < 2 || emailSplited[1].trim() == '')
            throw new AppError('Invalid email format. Please ensure you enter a valid email address, such as example@domain.com', ErrorCode.VALIDATION_ERROR);

        // Verifica o DDD
        const DDD = data.phone.slice(0, 2);
        if (!isValidDDD(DDD))
            throw new AppError('Invalid DDD code', ErrorCode.VALIDATION_ERROR);

        // Verifica tamanho do telefone + DDD
        if (data.phone.length !== 11)
            throw new AppError('Invalid phone format. Please ensure your enter a valid phone number, such as (11)99988776655', ErrorCode.VALIDATION_ERROR);
    }
}

export default UserController;