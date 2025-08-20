import { Router } from 'express'
import Blog from '../models/blogs.js'
const blogsRouter = Router()

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    return response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    const result = await blog.save()
    return response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

export default blogsRouter
