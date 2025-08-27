import { Router } from 'express'
import Blog from '../models/blogs.js'
import User from '../models/users.js'

const testingRouter = Router()

testingRouter.post('/reset', async (_, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

export default testingRouter
