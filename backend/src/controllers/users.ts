import Controller from './controller.js';
import { Request, Response } from "express";
// import UserRequest from '../types/Request.js';
import jwt from 'jsonwebtoken';

import { prisma } from '../index.js';
import { Prisma, Users } from '@prisma/client';

import { ErrorCode } from '../errors/errors.js';
import AppError from '../errors/app-error.js';

import { isValidDDD } from '../utils/phone.js';
import { decrypt, encrypt } from '../utils/hash.js';
import { auth } from '../utils/auth.js';
import { generateAuthCode, sendMail } from '../utils/mailer.js';
import UserRequest from '../types/Request.js';

class UserController extends Controller<Users> {
    constructor() { super(); }

    public async createUser(req: Request, res: Response): Promise<Response> {
        let data: Users = req.body;

        const result = await this.handler(async () => {
            this.validate(data);

            data.password = await encrypt(data.password);

            const authenticate_code = generateAuthCode();
            await sendMail(data.email, 'Confirme seu email', 'Código de autentificação: ' + authenticate_code)

            const user = await prisma.users.create({
                data: { ...data, authenticate_code },
                select: {
                    id_user: true, name: true, username: true, email: true, phone: true, img_url: true,
                },
            });
            return { message: 'Your email address is not authenticate, please check your inbox', data: user };
        })

        return this.handleResponse(res, result)
    }

    public async listUserById(req: UserRequest, res: Response): Promise<Response> {
        let id_user: number = Number(req.params.id) ?? 0;

        const result = await this.handler(async () => {
            const user = await prisma.users.findUniqueOrThrow({
                select: {
                    id_user: true, name: true, username: true, email: true, phone: true, img_url: true,
                },
                where: { id_user }
            });
            return user;
        })

        return this.handleResponse(res, result)
    }

    public async listUserSigned(req: UserRequest, res: Response): Promise<Response> {
        const result = await this.handler(() => {
            return req.user;
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

        const result = await this.handler(async () => {
            // Se informou ordem
            if (order) {
                let [orderField, orderDirection]: string[] = ((order as string).toLowerCase()).split(";");
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
            }

            const users = await prisma.users.findMany({
                select: {
                    id_user: true, name: true, username: true, email: true, phone: true, img_url: true,
                },
                skip, take, orderBy
            });
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

    public async authenticateUser(req: Request, res: Response): Promise<Response> {
        const result = await this.handler(async () => {
            const data: Users = req.body;
            let user: Users;

            if (data.email)
                user = await prisma.users.findUniqueOrThrow({ where: { email: data.email } });
            else if (data.username)
                user = await prisma.users.findUniqueOrThrow({ where: { username: data.username } });
            else
                throw new AppError('The authentication credentials have not been entered', ErrorCode.VALIDATION_ERROR);

            if (!user.register_at)
                throw new AppError('Your email address is not authenticate, please check your inbox.', ErrorCode.VALIDATION_ERROR);

            const passwordsIsEquals = await decrypt(data.password, user.password);
            if (!passwordsIsEquals)
                throw new AppError('The entered password is not equal to the user\'s password', ErrorCode.VALIDATION_ERROR);

            const { secret, expiresIn } = auth;
            const token = jwt.sign({ id_user: user.id_user }, secret, { expiresIn })

            return { token };
        });

        return this.handleResponse(res, result);
    }

    public async authenticateEmailCode(req: Request, res: Response): Promise<Response> {
        const result = await this.handler(async () => {
            const { email, authenticate_code } = req.body;

            if (!authenticate_code)
                throw new AppError('Authenticate code is not found', ErrorCode.VALIDATION_ERROR);

            const user = await prisma.users.findUniqueOrThrow({ where: { authenticate_code } });

            if (user.email != email)
                throw new AppError('Authenticate code is invalid', ErrorCode.VALIDATION_ERROR);

            await prisma.users.update({
                where: { email: user.email },
                data: { authenticate_code: null, register_at: new Date() }
            });

            return {
                'message': 'User\'s email has register!'
            };
        });

        return this.handleResponse(res, result);
    }

    public async sendForgotPasswordCode(req: Request, res: Response): Promise<Response> {
        const MAX_ATTEMPTS = 3;
        const RESET_TIME = 60 * 60 * 1000;
        const FIFTEEN_MINUTES = 15 * 60 * 1000;
        const NOW = Date.now();

        let data = req.body;

        const result = await this.handler(async () => {
            this.validate(data);

            const forgotPasswordCode = generateAuthCode();
            await sendMail(data.email, 'Restauração de senha', 'Código de restauração de senha: ' + forgotPasswordCode);

            await prisma.$transaction(async (prisma) => {
                let user = await prisma.users.findUnique({
                    where: { email: data.email }
                });

                if (!user) {
                    throw new AppError('User not found', ErrorCode.RECORD_NOT_FOUND_ERROR);
                }

                if (user.forgot_password_attempted_at &&
                    user.forgot_password_attempted_at.getTime() + RESET_TIME < NOW) {
                    await prisma.users.update({
                        where: { email: data.email },
                        data: {
                            forgot_password_attempts: 0,
                            forgot_password_attempted_at: null
                        }
                    });
                } else {
                    if (user.forgot_password_attempts >= MAX_ATTEMPTS) {
                        throw new AppError('You have exceeded password recovery attempts', ErrorCode.VALIDATION_ERROR);
                    }
                }

                const forgotPasswordExpiresAt = new Date(Date.now() + FIFTEEN_MINUTES);
                user = await prisma.users.update({
                    where: { email: data.email },
                    data: {
                        forgot_password_code: forgotPasswordCode,
                        forgot_password_expires_at: forgotPasswordExpiresAt,
                        forgot_password_attempts: { increment: 1 },
                        forgot_password_attempted_at: new Date()
                    }
                });
            });

            return { message: 'An authentication code was sent to your email, please check your inbox' };
        });

        return this.handleResponse(res, result);
    }

    public async authenticateForgotPasswordCode(req: Request, res: Response): Promise<Response> {
        const NOW = new Date();
        let { email, forgot_password_code, password } = req.body;

        const result = await this.handler(async () => {
            if (!forgot_password_code)
                throw new AppError('Authenticate code is not found', ErrorCode.VALIDATION_ERROR);

            const user = await prisma.users.findUniqueOrThrow({ where: { forgot_password_code } });

            if (user.email != email)
                throw new AppError('Authenticate code is invalid', ErrorCode.VALIDATION_ERROR);

            if (NOW > user.forgot_password_expires_at)
                throw new AppError('Authenticate code is expired', ErrorCode.VALIDATION_ERROR);

            this.validate({ email, password });

            password = await encrypt(password);

            await prisma.users.update({
                where: { email: user.email },
                data: {
                    password,
                    forgot_password_code: null,
                    forgot_password_expires_at: null,
                    forgot_password_attempts: 0,
                    forgot_password_attempted_at: null
                }
            });

            return {
                'message': 'User\'s forgot password request was accepted! Password was edited'
            };
        })

        return this.handleResponse(res, result)
    }

    public async editPassword(req: Request, res: Response): Promise<Response> {
        let data = req.body;

        const result = await this.handler(async () => {
            this.validate(data);

            const forgotPasswordCode = generateAuthCode();
            await sendMail(data.email, 'Restauração de senha', 'Código de resturação de senha: ' + forgotPasswordCode)

            return { message: 'A authentication code was send in your email, please check your inbox' };
        })

        return this.handleResponse(res, result)
    }

    /*public async editUser(req: UserRequest, res: Response): Promise<Response> {
        const id_user = req.user.id_user;
        const data = req.body;

        const result = this.handler(async () => {
            this.validate(data);

            if (!data)
                throw new AppError('There is no data to change', ErrorCode.VALIDATION_ERROR);

            const user: Users = await prisma.users.update({
                where: { id_user },
                data
            });

            return user;
        });

        return this.handleResponse(res, result);
    }*/

    public validate(data: any) {
        // Verifica formato do email
        if (data.email) {
            const emailSplited: string[] = data.email.split('@');
            if (emailSplited.length < 2 || emailSplited[1].trim() == '')
                throw new AppError('Invalid email format. Please ensure you enter a valid email address, such as example@domain.com', ErrorCode.VALIDATION_ERROR);
        }

        // Verifica o DDD
        if (data.phone) {
            const DDD = data.phone.slice(0, 2);
            if (!isValidDDD(DDD))
                throw new AppError('Invalid DDD code', ErrorCode.VALIDATION_ERROR);

            // Verifica tamanho do telefone + DDD
            if (data.phone.length !== 11)
                throw new AppError('Invalid phone format. Please ensure your enter a valid phone number, such as (11)99988776655', ErrorCode.VALIDATION_ERROR);
        }

        if (data.password) {
            const regexPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$_*&@#]{8,}$/;
            if (!regexPattern.test(data.password))
                throw new AppError('Invalid password, must contain at least 8 characters, 1 uppercase and lowercase letter, 1 number and 1 special letter', ErrorCode.VALIDATION_ERROR);
        }
    }
}

export default UserController;