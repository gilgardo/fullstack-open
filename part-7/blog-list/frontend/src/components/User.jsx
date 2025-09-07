import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { Card, ListGroup } from 'react-bootstrap'

const User = () => {
  const { id } = useParams()
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  )

  if (!user) return <Navigate to="/" />

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">{user.name}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">Added Blogs</Card.Subtitle>

        {user.blogs.length > 0 ? (
          <ListGroup variant="flush">
            {user.blogs.map((blog) => (
              <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted">This user hasn’t added any blogs yet.</p>
        )}
      </Card.Body>
    </Card>
  )
}

export default User
