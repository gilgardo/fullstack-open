import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Home from './Home'
import Message from './components/Message'
import Users from './components/Users'
import User from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { getFromStorage } from './reducers/userReducer'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import BlogDettail from './components/BlogDettail'

const App = () => {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  if (user) blogService.setToken(user.token)

  useEffect(() => {
    dispatch(getFromStorage())
  }, [])

  return (
    <>
      {user ? (
        <>
          <Header name={user.name} />
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<BlogDettail />} />
          </Routes>
        </>
      ) : (
        <>
          <h2>Log in to application</h2>
          <Message />
          <LoginForm />
        </>
      )}
    </>
  )
}
export default App
