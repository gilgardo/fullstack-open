import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])
  console.log(users)
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </th>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
