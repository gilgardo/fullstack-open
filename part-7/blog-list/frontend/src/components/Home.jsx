import Blog from './Blog'
import { useEffect } from 'react'
import BlogForm from './BlogForm'

import { useSelector, useDispatch } from 'react-redux'

import {
  createBlog,
  deleteBlog,
  fetchAllBlogs,
  updateBlog,
} from '../reducers/blogsReducer'

const Home = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  const handlePostNewBlog = async (newBlog) => {
    dispatch(createBlog(newBlog))
  }
  const handleLike = async (blog) => {
    dispatch(updateBlog(blog))
  }

  const handleDelete = async (id) => {
    dispatch(deleteBlog(id))
  }

  useEffect(() => {
    dispatch(fetchAllBlogs())
  }, [])

  return (
    <div>
      <BlogForm handlePostNewBlog={handlePostNewBlog} />

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
