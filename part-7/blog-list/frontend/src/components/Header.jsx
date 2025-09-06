import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'
import Message from './Message'
import { Link } from 'react-router-dom'

const Header = ({ name }) => {
  const dispatch = useDispatch()
  const handleLogOut = () => dispatch(logout())

  return (
    <>
      <h2>blogs</h2>
      <p>
        <Link to="/">blogs</Link>&nbsp;&nbsp;
        <Link to="/users">users</Link>&nbsp;&nbsp;
        <span>{name} logged in </span>&nbsp;&nbsp;
        <button onClick={handleLogOut}>Log Out</button>
      </p>
      <Message />
      <br />
    </>
  )
}

export default Header
