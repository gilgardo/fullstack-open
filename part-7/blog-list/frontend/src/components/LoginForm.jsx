import { useState } from 'react'
import { Form, Button, Card, Stack } from 'react-bootstrap'
import handleChangeForm from '../utils/handleChangeForm'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const handleChange = handleChangeForm(setLoginData)
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(login(loginData))
    setLoginData({ username: '', password: '' })
  }

  const { username, password } = loginData

  return (
    <Card className="container mt-4  mb-3 shadow-sm">
      <Card.Body>
        <Card.Title className="text-center">Log in to application</Card.Title>
        <Form data-testid="login_form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </Form.Group>

          <Stack direction="horizontal" gap={2}>
            <Button type="submit" variant="primary">
              Login
            </Button>
            <Button
              type="button"
              variant="outline-secondary"
              onClick={() => setLoginData({ username: '', password: '' })}
            >
              Clear
            </Button>
          </Stack>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default LoginForm
