import { useState } from 'react'
import blogService from '../services/blogs'
import getErrorMessage from '../utils/getErrorMessage'
const Blog = ({ blog, loggedUser, handleFrontendUpdate }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  // Ex: 5.8
  const handleLike = async () => {
    try {
      await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
      handleFrontendUpdate((prevBlogs) =>
        prevBlogs.map((el) =>
          el.id === blog.id ? { ...el, likes: el.likes + 1 } : el
        )
      )
    } catch (error) {
      console.log(getErrorMessage(error, error))
    }
  }

  // Ex: 5.11
  const handleDelete = async () => {
    if (!confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    try {
      await blogService.remove(blog.id)
      handleFrontendUpdate((prevBlogs) =>
        prevBlogs.filter((el) => el.id !== blog.id)
      )
    } catch (error) {
      console.log(getErrorMessage(error, error))
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleOpen}> {isOpen ? 'Hide' : 'View'}</button>
      </div>
      {isOpen && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.username}</div>
          {loggedUser === blog.user.username && (
            <button onClick={handleDelete}>remove</button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
