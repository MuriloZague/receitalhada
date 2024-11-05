import AppError from './app-error.js';
import { Left, left } from './left-right.js';
import { ErrorCode } from './errors.js';
import { Prisma } from '@prisma/client';

export const errorHandler = (error: any): Left<AppError> => {
  console.error(`[${error?.code ?? 0}] Error trigger: ${error.message}`);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Indica violação de chave única
    if (error.code === 'P2002') {
      return left(
        new AppError(
          'Unique constraint failed',
          ErrorCode.UNIQUE_CONSTRAINT_ERROR,
        ),
      );
    }
    // Indica violação de chave estrangeira
    if (error.code === 'P2003') {
      return left(
        new AppError(
          'Foreign key constraint failed',
          ErrorCode.FOREIGN_KEY_CONSTRAINT_ERROR,
        ),
      );
    }

    if (error.code === 'P2025') {
      return left(
        new AppError('Record not found', ErrorCode.RECORD_NOT_FOUND_ERROR),
      );
    }

    // Erro genérico do Prisma
    return left(new AppError('Prisma Error', ErrorCode.UNKNOWN_PRISMA_ERROR));
  }

  // Erro de validação
  if (error instanceof Prisma.PrismaClientValidationError) {
    return left(new AppError('Validation error', ErrorCode.VALIDATION_ERROR));
  }

  // Caso já seja um AppError, retorne-o diretamente
  if (error instanceof AppError) {
    return left(error);
  }

  // Erro não identificado, trate como um erro desconhecido
  return left(new AppError('Erro desconhecido', ErrorCode.UNKNOWN_ERROR));
};
