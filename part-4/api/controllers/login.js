import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/users.js'
import Router from 'express'
import config from '../utils/config.js'

const loginRouter = Router()

const comparePassword = async (user, password) => {
  if (user === null) return false
  return bcrypt.compare(password, user.passwordHash)
}

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const isPasswordCorrect = await comparePassword(user, password)

  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, config.SECRET)

  response.status(200).send({ token, username: user.username, name: user.name })
})

export default loginRouter
