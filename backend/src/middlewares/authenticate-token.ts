import UserRequest from "../types/Request.js";
import { NextFunction, Response } from "express";

import { prisma } from '../index.js';

import AppError from "../errors/app-error.js";
import { ErrorCode } from "../errors/errors.js";

import { tokenIsValid } from "../utils/auth.js";

export default async function AuthenticateToken(req: UserRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new AppError('Authorization header is missing', ErrorCode.AUTHORIZATION_ERROR));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(new AppError('Token is missing', ErrorCode.AUTHORIZATION_ERROR));
    }

    try {
        const payload = tokenIsValid(token) as { id_user: number };

        const user = await prisma.users.findUniqueOrThrow({
            select: {
                id_user: true,
                name: true,
                username: true,
                email: true,
                phone: true,
                img_url: true
            }, where: { id_user: Number(payload.id_user) }
        });

        req.user = user;
        next();
    } catch (error) {
        return next(res.status(500).json({ error: error.message, code: error.code }));
    }
}
