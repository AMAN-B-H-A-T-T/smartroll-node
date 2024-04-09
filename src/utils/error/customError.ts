type ErrorReturnType = {
  code: string
  message?: string
  field?: string
}

export abstract class CustomError extends Error {
  abstract statusCode: number
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, CustomError.prototype)
  }
  abstract serializeErrors(): ErrorReturnType
}
