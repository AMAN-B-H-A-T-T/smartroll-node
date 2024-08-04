import { ENVS } from 'constant'
import http from 'http'
import { serverConnectionLog } from 'utils/helpers'
import app from './app'

const server = http.createServer(app)

server.listen(ENVS.PORT, () => {
  serverConnectionLog()
})
