import express from 'express'

import { student_attendance_data } from 'controllers/test/handleThirdPartyData'
import { errorHandler } from 'middleware'
import { Server } from 'socket.io'

const router = express.Router()

export const createThirdPartyRoutes = (io: Server) => {
  // Route to handle third-party API data

  router.post('/manage/student_attendace_data', student_attendance_data(io))

  return router
}

// router.use('*', (req, res) => {
//   if (req.originalUrl === '/favicon.ico') {
//     res.status(204).end()
//   } else if (!res.headersSent) throw new NotFoundError('URL not Found dfas')
// })

router.use(errorHandler)

export default router
