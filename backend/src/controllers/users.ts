import Controller from './controller.js';
import { Request, Response } from "express";

import { prisma } from '../index.js';
import { Users } from '@prisma/client';

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
        const { page = 1, limit = 10 } = req.query;

        const pageNumber = Number(page);
        const pageSize = Number(limit);

        const result = await this.handler(async () => {
            const users = await prisma.users.findMany({
                skip: (pageNumber - 1) * pageSize,
                take: pageSize,
            });

            const totalUsers = await prisma.users.count();

            return {
                users,
                total: totalUsers,
                page: pageNumber,
                lastPage: Math.ceil(totalUsers / pageSize),
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