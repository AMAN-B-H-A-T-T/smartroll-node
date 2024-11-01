import express from 'express'

import { handleThirdPartyData } from 'controllers/test/handleThirdPartyData'
import { errorHandler } from 'middleware'
import { Server } from 'socket.io'

const router = express.Router()

export const createThirdPartyRoutes = (io: Server) => {
  // Route to handle third-party API data

  router.get('/api/third-party-data', handleThirdPartyData(io))

  return router
}

// router.use('*', (req, res) => {
//   if (req.originalUrl === '/favicon.ico') {
//     res.status(204).end()
//   } else if (!res.headersSent) throw new NotFoundError('URL not Found dfas')
// })

router.use(errorHandler)

export default router
