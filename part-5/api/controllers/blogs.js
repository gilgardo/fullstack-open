import { Router } from 'express'
import Blog from '../models/blogs.js'
import middleware from '../utils/middleware.js'

const blogsRouter = Router()

blogsRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})

blogsRouter.use(middleware.userExtractor)

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = request.user
  const blog = new Blog({
    title,
    author,
    url,
    user: user._id,
    likes: likes ? likes : 0,
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.status(201).json(savedBlog)
})

// Ex: 4.13
blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  const user = request.user
  const targetBlog = await Blog.findById(id)
  console.log(targetBlog, user)
  if (!targetBlog)
    return response.status(404).json({ message: 'blog not found' })
  if (targetBlog.user.toString() !== user._id.toString()) {
    return response
      .status(403)
      .json({ error: 'not authorized to delete this blog' })
  }
  await targetBlog.deleteOne()
  return response.status(204).end()
})

// Ex: 4.14
blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { likes } = request.body
  const user = request.user

  if (likes === undefined) {
    return response.status(400).json({ error: 'no likes received' })
  }

  const targetBlog = await Blog.findById(id)

  if (!targetBlog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (targetBlog.user.toString() !== user._id.toString()) {
    return response
      .status(403)
      .json({ error: 'not authorized to update this blog' })
  }

  targetBlog.likes = likes
  const updatedBlog = await targetBlog.save()

  return response.status(200).json(updatedBlog)
})

export default blogsRouter
