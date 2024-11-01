import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import xss from 'xss-clean'

import { logger } from 'config'
import { NODE_ENV } from 'constant'

const app = express()

/**
 * -------------------------- CORS --------------------------
 */
app.use(
  cors({
    origin: ['*'],
    credentials: true,
  }),
)

/**
 * -------------------------- EXPRESS --------------------------
 */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/**
 * -------------------------- MORGAN : LOGGER --------------------------
 *
 * Enable HTTP request logging middleware only in development environment
 */
if (process.env.NODE_ENV === NODE_ENV.dev) {
  app.use(morgan('dev'))
}

/**
 * -------------------------- COOKIE PARSER --------------------------
 */
app.use(cookieParser())

/**
 * -------------------------- COMPRESSION --------------------------
 *
 * Middleware for compressing response bodies
 */
app.use(compression())

/**
 * -------------------------- XSS --------------------------
 *
 * Middleware for sanitizing user input from XSS attacks
 */
app.use(xss())

/**
 * -------------------------- HELMET --------------------------
 *
 * Middleware for securing HTTP headers
 */
app.use(helmet())

/**
 * -------------------------- ROUTES --------------------------
 */

process.on('unhandledRejection', (reason) => {
  throw reason
})

process.on('uncaughtException', (err) => {
  logger.error(err)
  process.exit(0)
})

export default app
