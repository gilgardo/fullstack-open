import { useSelector } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  )

  return user ? (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  ) : (
    <Navigate to="/" />
  )
}

export default User
