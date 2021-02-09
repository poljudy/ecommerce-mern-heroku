import { Navbar, Nav, Container } from 'react-bootstrap'
import logo from '../images/logo.png'

const Header = () => {
  return (
    <header>
      <Navbar bg='primary' className='navbar-dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand className='mr-n4' href='/'>
            <Navbar.Brand>
              <img src={logo} alt='logo' className='logo-img' />
            </Navbar.Brand>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link href='/login'>
                <i className='fas fa-user'></i> הרשמה
              </Nav.Link>
              <Nav.Link href='/cart'>
                <i className='fas fa-shopping-cart'></i> עגלת קניות
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
