import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './LoginForm'
import useStorage from './hooks/useStorage'
import Home from './Home'
import useMessage from './hooks/useMessage'
import Message from './components/Message'
import getErrorMessage from './utils/getErrorMessage'

const App = () => {
  const [user, setUser] = useStorage('user_data')
  const [message, setMessage] = useMessage()

  if (user) blogService.setToken(user.token)

  const handleLogin = async (loginData) => {
    try {
      const data = await loginService.login(loginData)
      setUser(data)
      setMessage(null)
    } catch (error) {
      setMessage({
        message: getErrorMessage(error, 'login failed'),
        className: 'error',
      })
    }
  }

  const handelLogOut = () => setUser(null)

  return (
    <>
      {user ? (
        <Home
          user={user}
          handleLogOut={handelLogOut}
          message={message}
          setMessage={setMessage}
        />
      ) : (
        <>
          <h2>Log in to application</h2>
          {message && <Message {...message} />}
          <LoginForm handleLogin={handleLogin} />
        </>
      )}
    </>
  )
}
export default App
