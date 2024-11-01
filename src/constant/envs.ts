import { envConfig } from 'config/env'

interface Env {
  PORT: string
}

export const ENVS = envConfig.parsed as unknown as Env
