import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Collapse, Stack } from 'react-bootstrap'

const Blog = ({ blog, loggedUser, handleDelete, handleLike }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  const confirmDelete = () => {
    if (!window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`))
      return
    handleDelete(blog.id)
  }

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Card.Title>
              <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
                {blog.title}
              </Link>
            </Card.Title>
            <Card.Subtitle className="text-muted">
              By {blog.author}
            </Card.Subtitle>
          </div>
          <Button variant="outline-secondary" size="sm" onClick={toggleOpen}>
            {isOpen ? 'Hide' : 'View'}
          </Button>
        </div>

        <Collapse in={isOpen}>
          <div className="mt-3">
            <p>
              <strong>URL:</strong> {blog.url}
            </p>

            <div className="d-flex align-items-center mb-5">
              <strong className="me-2">Likes:</strong>
              <span>{blog.likes}</span>
              <Button
                variant="primary"
                size="sm"
                className="ms-2"
                onClick={() => handleLike(blog)}
              >
                Like
              </Button>
            </div>

            <Stack direction="horizontal">
              <span className="text-muted">Posted by {blog.user.username}</span>
              {loggedUser === blog.user.username && (
                <Button
                  variant="outline-danger"
                  className="ms-auto"
                  size="sm"
                  onClick={confirmDelete}
                >
                  Remove
                </Button>
              )}
            </Stack>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  )
}

export default Blog
