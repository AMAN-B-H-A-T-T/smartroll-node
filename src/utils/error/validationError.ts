import { ValidationError as YupValidationError } from 'yup'
import { CustomError } from './customError'
class ValidationError extends CustomError {
  readonly errorCode: string
  readonly statusCode: number
  readonly errors: YupValidationError

  constructor(errors: YupValidationError) {
    super('Validation Failed')
    this.errorCode = 'VALIDATION_FAILED'
    this.statusCode = 422
    this.errors = errors

    Object.setPrototypeOf(this, ValidationError.prototype)
  }

  serializeErrors() {
    return {
      code: this.errorCode,
      fields: this.errors.inner.map((err) => ({
        field: err.path?.split('.').slice(-1)[0],
        message: err.message,
      })),
    }
  }
}

export { ValidationError }
