import { logger } from 'config'
import { getValidatedData, tryCatch } from 'utils/helpers'

export const demoController = tryCatch(async (req, res) => {
  const data = getValidatedData(req)
  logger.info('🚀 ~ demoController ~ data:', data)

  res.json({ msg: 'PASS', data })
})
