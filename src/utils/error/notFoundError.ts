import { CustomError } from './customError'

class NotFoundError extends CustomError {
  readonly errorCode: string
  readonly statusCode: number

  constructor(message: string) {
    super(message)
    this.errorCode = 'NOT_FOUND'
    this.statusCode = 404

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors() {
    return {
      code: this.errorCode,
      message: this.message,
    }
  }
}

export { NotFoundError }
