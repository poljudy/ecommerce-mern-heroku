import { useSelector } from 'react-redux'
import { LinkContainer as Link } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
import logo from '../images/logo.png'
import CartToast from './CartToast'

const Header = () => {
  const cart = useSelector((state) => state.cart)

  const { cartItems, toast } = cart

  return (
    <header>
      <Navbar bg='primary' className='navbar-dark' expand='lg' collapseOnSelect>
        <Container>
          <Link to='/'>
            <Navbar.Brand className='mr-n4'>
              <Navbar.Brand>
                <img src={logo} alt='logo' className='logo-img' />
              </Navbar.Brand>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Link to='/login'>
                <Nav.Link>
                  <i className='fas fa-user'></i> הרשמה
                </Nav.Link>
              </Link>
              <Link to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> עגלת קניות{' '}
                  {cartItems.length > 0 &&
                    `(${cartItems.reduce(
                      (acc, item) => acc + Number(item.qty),
                      0
                    )})`}
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>{' '}
          {toast && <CartToast />}
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
