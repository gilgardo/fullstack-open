import { Router } from 'express'
import bcrypt from 'bcrypt'
import Blog from '../models/blogs.js'
import User from '../models/users.js'

const testingRouter = Router()

testingRouter.post('/reset', async (_, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  response.status(204).end()
})

testingRouter.post('/init', async (request, response) => {
  const { user, blogs } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(user.password, saltRounds)
  const { password, ...rest } = user

  const newUser = new User({
    ...rest,
    passwordHash,
  })
  const savedUser = await newUser.save()
  const savedBlogs = await Promise.all(
    blogs.map((blog) => {
      const newBlog = new Blog({
        ...blog,
        user: savedUser._id,
        likes: blog.likes ?? 0,
      })
      return newBlog.save()
    })
  )
  savedUser.blogs = savedBlogs.map((b) => b._id)
  await savedUser.save()

  response.status(201).json({
    user: savedUser,
    blogs: savedBlogs,
  })
})

export default testingRouter
