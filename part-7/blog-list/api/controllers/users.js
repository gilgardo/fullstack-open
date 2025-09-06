import bcrypt from 'bcrypt'
import { Router } from 'express'
import User from '../models/users.js'

const usersRouter = Router()

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  if (!password || password.length < 3) {
    const error = new Error('password is too short')
    error.name = 'ValidationError'
    return next(error)
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (_, response) => {
  const users = await User.find({}).populate('blogs', { user: 0 })
  response.json(users)
})

export default usersRouter
