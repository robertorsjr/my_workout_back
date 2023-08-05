import { ApiErrorEnum } from "../@types/apiError";

export class ApiError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number){
    super(message)
    this.statusCode = statusCode

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string){
    super(message, ApiErrorEnum.BAD_REQUEST)
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string){
    super(message, ApiErrorEnum.NOT_FOUND)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string){
    super(message, ApiErrorEnum.UNAUTORIZED)
  }
}