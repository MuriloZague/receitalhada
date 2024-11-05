import { Response } from 'express';

import { errorHandler } from '../errors/error-handler.js';
import { Either, right } from '../errors/left-right.js';
import AppError from '../errors/app-error.js';

// Classe é criada recebendo uma inferência de tipo genérico
abstract class Controller<T> {
  constructor() {}

  /**
   * Handler para executar closure function e passar por um either method para disparar erro (Left) ou prosseguir com sucesso (Right)
   * @param fn:Function (O resultado dessa função deve retornar um valor igual ao tipo genérico T, caso contrário, retornará erro)
   */
  protected async handler(fn: Function): Promise<Either<AppError, T>> {
    try {
      const result = await fn();
      return right(result);
    } catch (error) {
      return errorHandler(error);
    }
  }

  /**
   * Handler para padronizar respostas das rotas
   * @param res Response da rota para retornar a resposta adequada
   * @param result Resultado do handler
   * @returns Retornar a response com status e mensagem adequada
   */
  protected handleResponse(
    res: Response,
    result: Either<AppError, T>,
  ): Response {
    if (result.type === 'left') {
      const error = result.error;
      return res.status(500).json({ error: error.message, code: error.code });
    } else {
      const data = result.value;
      return res.status(201).json(data);
    }
  }

  protected abstract validate(data: T): void;
}

export default Controller;
