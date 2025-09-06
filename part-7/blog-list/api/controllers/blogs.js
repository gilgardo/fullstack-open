import { Router } from 'express'
import Blog from '../models/blogs.js'
import Comment from '../models/comments.js'
import middleware from '../utils/middleware.js'

const blogsRouter = Router()

blogsRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const { id } = request.params
  const blog = await Blog.findById(id).populate('comments', { blog: 0 })
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  return response.json(blog.comments)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { id } = request.params
  const { content } = request.body

  if (!content) {
    return response.status(400).json({ error: 'no content received' })
  }

  const targetBlog = await Blog.findById(id)
  if (!targetBlog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  const comment = new Comment({
    content,
    blog: targetBlog._id,
  })

  const savedComment = await comment.save()

  targetBlog.comments = targetBlog.comments.concat(savedComment._id)
  await targetBlog.save()

  return response.status(201).json(savedComment)
})

// Ex: 4.14
blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { likes } = request.body

  if (likes === undefined) {
    return response.status(400).json({ error: 'no likes received' })
  }

  const targetBlog = await Blog.findById(id)
  if (!targetBlog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  targetBlog.likes = likes
  const updatedBlog = await targetBlog.save()
  const populatedBlog = await updatedBlog.populate('user', {
    username: 1,
    name: 1,
  })

  return response.status(200).json(populatedBlog)
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
  let savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  savedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
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

export default blogsRouter
