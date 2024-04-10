import { NextFunction, Response } from 'express'
import { RequestWithValidate } from 'types/common'
import { ValidationError } from 'utils/error/validationError'
import { Schema, ValidationError as YupValidationError } from 'yup'

const validate = (schema: Schema, abortEarly: boolean = false) => {
  return async (
    req: RequestWithValidate,
    _res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await schema.validate(
        { body: req.body, params: req.params, query: req.query },
        { abortEarly },
      )

      req.validatedData = result

      next()
    } catch (error) {
      if (error instanceof YupValidationError) {
        next(new ValidationError(error))
      }

      next(error)
    }
  }
}

export { validate }
