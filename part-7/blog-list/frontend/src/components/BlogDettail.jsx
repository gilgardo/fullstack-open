import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { updateBlog } from '../reducers/blogsReducer'
import { createComment, fetchAllComments } from '../reducers/commentsReducer'
import { useEffect, useState } from 'react'
import { Card, Button, Form, ListGroup } from 'react-bootstrap'

const BlogDettail = () => {
  const { id } = useParams()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )
  const comments = useSelector((state) => state.comments[id]) ?? []
  const dispatch = useDispatch()
  const [content, setContent] = useState('')

  useEffect(() => {
    dispatch(fetchAllComments(id))
  }, [id, dispatch])

  const handleLike = () => dispatch(updateBlog(blog))
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createComment({ id, content }))
    setContent('')
  }

  if (!blog) return <Navigate to="/" />

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {blog.user.name}
        </Card.Subtitle>

        <Card.Text>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </Card.Text>

        <div className="d-flex align-items-center mb-3 gap-2">
          <span>{blog.likes} likes</span>
          <Button variant="primary" size="sm" onClick={handleLike}>
            Like
          </Button>
        </div>

        <hr />

        <h5>Comments</h5>
        <Form onSubmit={handleSubmit} className="mb-3">
          <Form.Group className="d-flex gap-2">
            <Form.Control
              type="text"
              name="content"
              value={content}
              placeholder="Add a comment"
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <Button type="submit" variant="success">
              Add
            </Button>
          </Form.Group>
        </Form>

        <ListGroup variant="flush">
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default BlogDettail
