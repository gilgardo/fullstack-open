import Blog from './components/Blog'
import { useEffect, useRef } from 'react'
import BlogForm from './BlogForm'
import getErrorMessage from './utils/getErrorMessage'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import {
  createBlog,
  deleteBlog,
  fetchAllBlogs,
  updateBlog,
} from './reducers/blogsReducer'
import Message from './components/Message'

const Home = ({ user, handleLogOut }) => {
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()
  const toggleRef = useRef(null)

  const handlePostNewBlog = async (newBlog) => {
    dispatch(createBlog(newBlog))
    toggleRef.current.toggleVisibility()
  }
  const handleLike = async (blog) => {
    try {
      dispatch(updateBlog(blog))
    } catch (error) {
      console.log(getErrorMessage(error, error))
    }
  }

  const handleDelete = async (id) => {
    try {
      dispatch(deleteBlog(id))
    } catch (error) {
      console.log(getErrorMessage(error, error))
    }
  }

  useEffect(() => {
    dispatch(fetchAllBlogs())
  }, [])

  return (
    <div>
      <h2>blogs</h2>

      <div>
        {user.name} logged in
        <button onClick={handleLogOut}>Log Out</button>
      </div>
      <br />
      <Message />
      <Togglable buttonLabel="new blog" ref={toggleRef}>
        <BlogForm handlePostNewBlog={handlePostNewBlog} />
      </Togglable>
      <br />
      {blogs.map((blog) => (
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
