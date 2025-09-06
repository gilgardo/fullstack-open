import { useState } from 'react'
import handleChangeForm from '../utils/handleChangeForm'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
const LoginForm = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const handleChange = handleChangeForm(setLoginData)
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      dispatch(login(loginData))
      setLoginData({ username: '', password: '' })
    } catch (error) {
      console.log(error)
    }
  }
  const { username, password } = loginData
  return (
    <form data-testid="login_form" onSubmit={handleSubmit}>
      <div>
        <label>
          username
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
