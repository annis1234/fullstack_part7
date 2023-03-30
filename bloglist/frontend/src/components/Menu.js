import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { getUser } from '../UserContext'

const Menu = ( { handleLogout }) => {

  const user = getUser()

  const padding = {
    paddingRight:5,
    color: 'black'
  }

  return(
    <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to ='/users'>users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to ='/'>blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user.name} logged in <button onClick={handleLogout} >logout</button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu