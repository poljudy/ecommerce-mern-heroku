import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import logo from '../images/logo.png'
import CartToast from './CartToast'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems, toast } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='primary' className='navbar-dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='mr-n4'>
              <Navbar.Brand>
                <img src={logo} alt='logo' className='logo-img' />
              </Navbar.Brand>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={`תפריט מנהל מערכת  `} id='adminmenu'>
                  <LinkContainer to='/admin/orders'>
                    <NavDropdown.Item>רשימת הזמנות</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/products'>
                    <NavDropdown.Item>רשימת מוצרים</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/users'>
                    <NavDropdown.Item>רשימת משתמשים</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>אזור אישי</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    יציאה
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {userInfo && !userInfo.isAdmin ? (
                <NavDropdown title={`${userInfo.name}  `} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>אזור אישי</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    יציאה
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                !userInfo && (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className='fas fa-user'></i> התחברות והרשמה
                    </Nav.Link>
                  </LinkContainer>
                )
              )}
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> עגלת קניות{' '}
                  {cartItems.length > 0 &&
                    `(${cartItems.reduce(
                      (acc, item) => acc + Number(item.qty),
                      0
                    )})`}
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>{' '}
          {toast && <CartToast />}
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
