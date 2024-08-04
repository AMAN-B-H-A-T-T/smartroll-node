import express from 'express'

import { errorHandler } from 'middleware'
import { NotFoundError } from 'utils/error'
import testRoutes from './test'

const router = express.Router()

router.use('/test', testRoutes)

router.use('*', () => {
  throw new NotFoundError('URL not Found')
})

router.use(errorHandler)

export default router
