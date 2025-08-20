import Blog from '../models/blogs.js'
import initialBlogs from './initialBlogs.js'

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map((note) => note.toJSON())
}

const resetDb = async () => Blog.deleteMany({})

const initDb = async () => Blog.insertMany(initialBlogs)

export default { blogsInDb, resetDb, initDb }
