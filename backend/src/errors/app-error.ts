import { ErrorCode } from './errors.js';

class AppError extends Error {
  code: ErrorCode;

  constructor(message: string, code: ErrorCode) {
    super(message);
    this.code = code;
  }
}

export default AppError;
