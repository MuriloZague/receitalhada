import UserRequest from '../types/Request.js';
import { NextFunction, Response } from 'express';

import { prisma } from '../index.js';

import AppError from '../errors/app-error.js';
import { ErrorCode } from '../errors/errors.js';

import { tokenIsValid } from '../utils/auth.js';
import { errorHandler } from '../errors/error-handler.js';

export default async function AuthenticateToken(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(
      new AppError(
        'Authorization header is missing',
        ErrorCode.AUTHORIZATION_ERROR,
      ),
    );
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next(
      new AppError('Token is missing', ErrorCode.AUTHORIZATION_ERROR),
    );
  }

  try {
    const { id_user } = tokenIsValid(token) as { id_user: number };

    const user = await prisma.users.findUnique({
      select: {
        id_user: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        img_url: true,
        register_at: true,
      },
      where: { id_user },
    });

    if (!user)
      throw new AppError(
        'User has not found',
        ErrorCode.RECORD_NOT_FOUND_ERROR,
      );

    req.user = user;

    if (!user.register_at)
      throw new AppError(
        'Your email address is not authenticate, please check your inbox.',
        ErrorCode.VALIDATION_ERROR,
      );

    next();
  } catch (error) {
    const result = errorHandler(error);
    if (result.type === 'left') {
      const handledError = result.error;
      res
        .status(500)
        .json({ error: handledError.message, code: handledError.code });
      return;
    }
    next(error);
  }
}
