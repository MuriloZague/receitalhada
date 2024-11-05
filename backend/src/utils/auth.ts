import jwt, { JwtPayload } from 'jsonwebtoken';

import AppError from '../errors/app-error.js';
import { ErrorCode } from '../errors/errors.js';

export const auth = {
  secret: String(process.env.JWT_TOKEN),
  expiresIn: String(process.env.JWT_EXPIRES_IN),
};

export function tokenIsValid(token: string): JwtPayload {
  try {
    const result = jwt.verify(token, auth.secret) as JwtPayload;
    return result;
  } catch (error) {
    if (error?.name == 'TokenExpiredError')
      throw new AppError('Token was expired', ErrorCode.AUTHORIZATION_ERROR);

    if (error?.name == 'JsonWebTokenError')
      throw new AppError(
        'Invalid token signature',
        ErrorCode.AUTHORIZATION_ERROR,
      );

    throw new AppError(
      'User not found or invalid token',
      ErrorCode.AUTHORIZATION_ERROR,
    );
  }
}
