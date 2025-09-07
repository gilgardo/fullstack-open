import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'
import Message from './Message'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'

const Header = ({ name }) => {
  const dispatch = useDispatch()
  const handleLogOut = () => dispatch(logout())
  return (
    <>
      <Navbar bg="light" variant="light" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand>Blogs App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              <LinkContainer to="/">
                <Nav.Link>Blogs</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/users">
                <Nav.Link>Users</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="ms-auto align-items-center gap-4">
              <Navbar.Text className="me-2">
                {' '}
                <span className="fw-bold">{name}</span> logged in
              </Navbar.Text>
              <Button variant="warning" size="sm" onClick={handleLogOut}>
                Log Out
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Message />
    </>
  )
}

export default Header
