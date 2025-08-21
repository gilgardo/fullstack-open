import Blog from '../models/blogs.js'
import initialBlogs from './initialBlogs.js'
import User from '../models/users.js'
import bcrypt from 'bcrypt'
import config from '../utils/config.js'
import jwt from 'jsonwebtoken'

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map((note) => note.toJSON())
}

const resetDb = async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
}

const makeMockUser = async () => {
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()

  const userForToken = {
    username: user.username,
    id: user._id,
  }
  const token = jwt.sign(userForToken, config.SECRET)

  return { ...userForToken, token: `Bearer ${token}` }
}

const initDb = async (userWithToken) => {
  const user = await User.findById(userWithToken.id)
  const blogsToInsert = initialBlogs.map((blog) => ({
    ...blog,
    user: user._id,
  }))

  const savedBlogs = await Blog.insertMany(blogsToInsert)

  user.blogs = user.blogs.concat(savedBlogs.map((blog) => blog._id))
  await user.save()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

export default { blogsInDb, resetDb, initDb, usersInDb, makeMockUser }
