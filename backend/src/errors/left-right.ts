type Left<AppError> = { type: 'left'; error: AppError };
type Right<T> = { type: 'right'; value: T };

type Either<T, U> = Left<T> | Right<U>;

const left = <T>(error: T): Left<T> => ({ type: 'left', error });
const right = <U>(value: U): Right<U> => ({ type: 'right', value });

export { Either, Left, Right, left, right };
