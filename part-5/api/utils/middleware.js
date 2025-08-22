import logger from './logger.js'
import User from '../models/users.js'
import jwt from 'jsonwebtoken'
import config from './config.js'

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    })
  }

  next(error)
}

/*
Ex: 4.20

const tokenExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  if (!(authorization && authorization.startsWith('Bearer '))) {
    return response.status(401).json({ error: 'authorization invalid' })
  }
  const token = authorization.replace('Bearer ', '')
  request.token = token
  next()
}
*/

// Ex: 4.22
const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  if (!(authorization && authorization.startsWith('Bearer '))) {
    return response.status(401).json({ error: 'authorization invalid' })
  }
  const token = authorization.replace('Bearer ', '')
  const decodedToken = jwt.verify(token, config.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(401).json({ error: 'userId missing or not valid' })
  }
  request.user = user
  next()
}

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
}
