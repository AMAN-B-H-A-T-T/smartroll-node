import { ENVS } from 'constant'
import http from 'http'
import { serverConnectionLog } from 'utils'
import app from './app'

const server = http.createServer(app)

server.listen(ENVS.PORT, () => {
  serverConnectionLog()
})
