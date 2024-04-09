/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'

type Controller = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => Promise<void> | void

const tryCatch = (controller: Controller) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

export { tryCatch }
