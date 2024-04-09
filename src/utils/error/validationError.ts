import { CustomError } from './customError'

class ValidationError extends CustomError {
  readonly errorCode: string
  readonly statusCode: number

  constructor(message: string) {
    super(message)
    this.errorCode = 'VALIDATION_ERROR'
    this.statusCode = 422

    Object.setPrototypeOf(this, ValidationError.prototype)
  }

  serializeErrors() {
    return {
      code: this.errorCode,
      message: this.message,
      field: 'asdads',
    }
  }
}

export { ValidationError }
