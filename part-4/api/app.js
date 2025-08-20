import express from 'express'
import mongoose from 'mongoose'
import config from './utils/config.js'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'
import blogsRouter from './controllers/blogs.js'

const app = express()

try {
  logger.info('connecting to', config.MONGODB_URI)
  await mongoose.connect(config.MONGODB_URI)
  logger.info('connected to MongoDB')
} catch (error) {
  logger.error('error connection to MongoDB:', error.message)
  process.exit(1)
}

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
