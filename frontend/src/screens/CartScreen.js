import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, hideToast, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id, qty) => {
    const message =
      qty === 1 ? 'הפריט הוסר מהעגלה בהצלחה' : 'הפריטים הוסרו מהעגלה בהצלחה'

    dispatch(removeFromCart(id, message))

    setTimeout(() => {
      dispatch(hideToast())
    }, 3500)
  }

  const checkoutHandler = () => {
    history.push(`/login?redirect=shipping`)
  }

  return (
    <>
      <Button onClick={() => history.goBack()}>חזרה</Button>
      <Row>
        <Col md={8}>
          <h1>עגלת קניות</h1>
          {cartItems.length === 0 ? (
            <>
              <Message variant='brand'>
                עגלת הקניות שלכם ריקה...{' '}
                <Link onClick={() => history.goBack()}>חזרה</Link>{' '}
              </Message>
            </>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2} className='my-auto'>
                      <Link to={`/product/${item.product}`}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Link>
                    </Col>
                    <Col md={3} className='my-auto'>
                      <Link to={`/product/${item.product}`}>
                        {item.name.length > 30
                          ? `${item.name.slice(0, 30)}...`
                          : `${item.name}`}
                      </Link>
                    </Col>
                    <Col md={3} className='my-auto'>
                      {item.price.toLocaleString('he-IL')} ש"ח
                    </Col>
                    <Col md={2} className='my-auto'>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(
                            addToCart(
                              item.product,
                              Number(e.target.value),
                              'עגלת הקניות עודכנה בהצלחה'
                            )
                          )
                          setTimeout(() => {
                            dispatch(hideToast())
                          }, 3500)
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2} className='text-center my-auto'>
                      <i
                        className='fas fa-trash mt-4-sm'
                        onClick={() =>
                          removeFromCartHandler(item.product, item.qty)
                        }
                      ></i>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card style={{ border: 'none' }}>
            <ListGroup
              variant='flush'
              style={{
                position: 'absolute',
                top: '73px',
                width: '100%',
                textAlign: 'center',
              }}
            >
              {cartItems.length > 0 && (
                <>
                  <ListGroup.Item>
                    <h2 className='my-auto'>
                      סכום ביניים:{' '}
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.qty),
                        0
                      )}{' '}
                      מוצרים
                    </h2>
                    <h1>
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toLocaleString('he-IL')}{' '}
                      ש"ח
                    </h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn-block btn-brand'
                      onClick={checkoutHandler}
                    >
                      המשיכו לקופה
                    </Button>
                  </ListGroup.Item>
                </>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartScreen
