import { CustomError } from './customError'

class ApiError extends CustomError {
  readonly errorCode: string
  readonly statusCode: number

  constructor(message: string, errorCode: string, statusCode: number) {
    super(message)
    this.errorCode = errorCode
    this.statusCode = statusCode

    Object.setPrototypeOf(this, ApiError.prototype)
  }

  serializeErrors() {
    return {
      code: this.errorCode,
      message: this.message,
    }
  }
}

export { ApiError }
