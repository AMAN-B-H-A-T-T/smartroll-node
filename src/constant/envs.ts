import { envConfig } from 'config/env'

interface Env {
  PORT: string
  // ---------- RATE LIMIT ----------
  RATE_LIMIT: boolean
  RATE_LIMIT_DURATION: number | string
  RATE_LIMIT_REQUEST: number | string
  JWT_SECRET: string
  JWT_EXPIRY: string
}

export const ENVS = envConfig.parsed as unknown as Env
