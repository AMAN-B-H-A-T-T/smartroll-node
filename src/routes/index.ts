import express from 'express'

import testRoutes from './test'
import { errorHandler } from 'middleware'

const router = express.Router()

router.use('/test', testRoutes)

router.use(errorHandler)

export default router
