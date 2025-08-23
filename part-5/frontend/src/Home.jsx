import Blog from './components/Blog'
import { useEffect, useState } from 'react'
import blogService from './services/blogs'
import BlogForm from './BlogForm'
import Message from './components/Message'
import getErrorMessage from './utils/getErrorMessage'

const Home = ({ user, handleLogOut, message, setMessage }) => {
  const [blogs, setBlogs] = useState([])

  const handlePostNewBlog = async (newBlog) => {
    try {
      const data = await blogService.create(newBlog)
      setBlogs((prev) => [...prev, data])
      setMessage({
        message: `a new blog ${data.title}, by ${data.author} added`,
        className: 'success',
      })
    } catch (error) {
      setMessage({
        message: getErrorMessage(error, 'Failed to post the blog'),
        className: 'error',
      })
    }
  }

  useEffect(() => {
    const fetcBlogs = async () => {
      const data = await blogService.getAll()
      setBlogs(data)
    }
    fetcBlogs()
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {message && <Message {...message} />}
      <div>
        {user.name} logged in
        <button onClick={handleLogOut}>Log Out</button>
      </div>
      <br />
      <BlogForm handlePostNewBlog={handlePostNewBlog} />
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Home
