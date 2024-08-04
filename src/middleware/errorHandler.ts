import { logger } from 'config'
import { ErrorRequestHandler } from 'express'
import { CustomError } from 'utils/error/customError'

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  logger.error(error)

  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ ...error.serializeErrors() })
  }

  res.status(400).send('Something went wrong!!')
}

export { errorHandler }
