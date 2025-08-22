import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import useStorage from './hooks/useStorage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useStorage('user_data')
  const [loginData, setLoginData] = useState({ username: '', password: '' })

  if (user) blogService.setToken(user.token)

  useEffect(() => {
    const fetcBlogs = async () => {
      const data = await blogService.getAll()
      setBlogs(data)
    }
    fetcBlogs()
  }, [])

  const handleChange = ({ target }) =>
    setLoginData((prevData) => ({ ...prevData, [target.name]: target.value }))
  const handleLogin = async (e) => {
    e.preventDefault()
    const data = await loginService.login(loginData)
    setUser(data)
    setLoginData({ username: '', password: '' })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm
          loginData={loginData}
          handleChange={handleChange}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <h3>{user.name} logged in</h3>
      <button onClick={() => setUser(null)}>Log Out</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
