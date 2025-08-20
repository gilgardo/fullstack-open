import { Router } from 'express'
import Blog from '../models/blogs.js'
const blogsRouter = Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { likes } = request.body
  const blog = new Blog({ ...request.body, likes: likes ? likes : 0 })
  const result = await blog.save()
  return response.status(201).json(result)
})

// Ex: 4.13
blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  const result = await Blog.findByIdAndDelete(id)
  if (result) {
    return response.status(204).end()
  }
  return response.status(404).json({ message: 'blog not found' })
})

// Ex: 4.14
blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { likes } = request.body

  if (!likes) {
    return response.status(400).json({ message: 'no likes received' })
  }

  const result = await Blog.findByIdAndUpdate(
    id,
    { likes },
    { new: true, runValidators: true, context: 'query' }
  )
  if (!result) {
    return response.status(404).json({ message: 'blog not found' })
  }

  return response.status(200).json(result)
})

export default blogsRouter
