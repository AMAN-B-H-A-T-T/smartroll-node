import { logger } from 'config'
import express from 'express'
import { ApiError } from 'utils/error/apiError'
import { tryCatch } from 'utils/helpers/tryCatch'

const router = express.Router()

router.get(
  '/',
  tryCatch(async (_req, _res, _next) => {
    logger.info('TEST LOG')
    throw new ApiError('API ERROR TEST', 'TEST_ERRO', 401)
    // throw new ValidationError('Fail to validate login')
  }),
)

export default router
