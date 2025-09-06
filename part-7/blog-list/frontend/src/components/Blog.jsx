import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, loggedUser, handleDelete, handleLike }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const confirmDelete = () => {
    if (!confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    handleDelete(blog.id)
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-header">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}{' '}
        </Link>
      </div>
      <button onClick={toggleOpen}> {isOpen ? 'Hide' : 'View'}</button>
      {isOpen && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>{blog.user.username}</div>
          {loggedUser === blog.user.username && (
            <button onClick={confirmDelete}>remove</button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
