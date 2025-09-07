import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Message from './components/Message'
import Users from './components/Users'
import User from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { getFromStorage } from './reducers/userReducer'
import { useEffect } from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import Header from './components/Header'
import BlogDettail from './components/BlogDettail'

function AppLayout({ name }) {
  return (
    <div className="container">
      <Header name={name} />

      <Outlet />
    </div>
  )
}

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
          <Routes>
            <Route element={<AppLayout name={user.name} />}>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<BlogDettail />} />
            </Route>
          </Routes>
        </>
      ) : (
        <>
          <Message />
          <LoginForm />
        </>
      )}
    </>
  )
}
export default App
