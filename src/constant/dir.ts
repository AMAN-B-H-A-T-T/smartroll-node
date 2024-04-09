import fs from 'fs'
import path from 'path'

const LOGS_DIR = path.join(__dirname, '..', '..', 'logs')

if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR)
}

export const LOG_DIR = {
  ERROR_LOG_DIR: path.join(LOGS_DIR, 'error'),
  INFO_LOG_DIR: path.join(LOGS_DIR, 'info'),
}
