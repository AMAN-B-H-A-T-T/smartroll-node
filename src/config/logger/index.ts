import { NODE_ENV } from 'constant'
import { devLogger } from './development.logger'
import { productionLogger } from './production.logger'

const initLogger = () => {
  if (process.env.NODE_ENV !== NODE_ENV.dev) {
    return devLogger()
  }

  return productionLogger()
}

const logger = initLogger()

export default logger
