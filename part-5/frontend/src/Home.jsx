import Blog from './components/Blog'
import { useEffect, useRef, useState } from 'react'
import blogService from './services/blogs'
import BlogForm from './BlogForm'
import Message from './components/Message'
import getErrorMessage from './utils/getErrorMessage'
import Togglable from './components/Togglable'

const Home = ({ user, handleLogOut, message, setMessage }) => {
  const [blogs, setBlogs] = useState([])
  const toggleRef = useRef(null)
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  const handlePostNewBlog = async (newBlog) => {
    try {
      const data = await blogService.create(newBlog)
      setBlogs((prev) => [...prev, data])
      setMessage({
        message: `a new blog ${data.title}, by ${data.author} added`,
        className: 'success',
      })
      toggleRef.current.toggleVisibility()
    } catch (error) {
      setMessage({
        message: getErrorMessage(error, 'Failed to post the blog'),
        className: 'error',
      })
    }
  }

  const handleFrontendUpdate = (updateFn) => setBlogs(updateFn)

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
      <Togglable buttonLabel="a new Blog" ref={toggleRef}>
        <BlogForm handlePostNewBlog={handlePostNewBlog} />
      </Togglable>
      <br />
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          loggedUser={user.username}
          handleFrontendUpdate={handleFrontendUpdate}
        />
      ))}
    </div>
  )
}

export default Home
