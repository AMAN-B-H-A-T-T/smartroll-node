import { ENVS } from 'constant'
import http from 'http'
import router, { createThirdPartyRoutes } from 'routes'
import { Server } from 'socket.io'
import { serverConnectionLog } from 'utils/helpers'
import { setupSocket } from 'utils/services/socket'
import app from './app'

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: '*',
    exposedHeaders: '*',
  },
})

setupSocket(io)

// Use the third-party routes and pass the Socket.io instance
app.use('/socket', createThirdPartyRoutes(io))
app.use(router)

server.listen(ENVS.PORT, () => {
  serverConnectionLog()
})
