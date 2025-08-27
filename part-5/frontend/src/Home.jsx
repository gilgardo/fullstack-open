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

  // Ex: 5.8
  const handleLike = async (blog) => {
    try {
      await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
      setBlogs((prevBlogs) =>
        prevBlogs.map((el) =>
          el.id === blog.id ? { ...el, likes: el.likes + 1 } : el
        )
      )
    } catch (error) {
      console.log(getErrorMessage(error, error))
    }
  }

  // Ex: 5.11
  const handleDelete = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs((prevBlogs) => prevBlogs.filter((el) => el.id !== id))
    } catch (error) {
      console.log(getErrorMessage(error, error))
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
      <Togglable buttonLabel="new blog" ref={toggleRef}>
        <BlogForm handlePostNewBlog={handlePostNewBlog} />
      </Togglable>
      <br />
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          loggedUser={user.username}
          handleDelete={handleDelete}
          handleLike={handleLike}
        />
      ))}
    </div>
  )
}

export default Home
