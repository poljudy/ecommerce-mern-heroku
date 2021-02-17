import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import NumberFormat from 'react-number-format'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import PayPal from '../images/paypal.png'
import { addToCart, hideToast, removeFromCart } from '../actions/cartActions'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/cart')
    }
  }, [history, userInfo])

  // Calculate prices
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  cart.shippingPrice = addDecimals(50)

  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2)

  const removeFromCartHandler = (id, qty) => {
    const message =
      qty === 1 ? 'הפריט הוסר מהעגלה בהצלחה' : 'הפריטים הוסרו מהעגלה בהצלחה'

    dispatch(removeFromCart(id, message))

    setTimeout(() => {
      dispatch(hideToast())
    }, 3500)
  }

  const placeOrderHandler = () => {
    console.log('place order')
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>כתובת למשלוח</h2>
              <p>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                <span className='mb-0' style={{ display: 'block' }}>
                  {cart.shippingAddress.postalCode &&
                    cart.shippingAddress.postalCode}
                </span>
                {cart.shippingAddress.phoneNumber && (
                  <span style={{ display: 'block' }}>
                    טלפון: {cart.shippingAddress.phoneNumber}
                  </span>
                )}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>שיטת תשלום</h2>
              {cart.paymentMethod === 'PayPal' && (
                <Image src={PayPal} alt='PayPal' className='paypal-img' />
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>מוצרים בהזמנה</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant='brand' dismissible={false}>
                  עגלת הקניות ריקה
                </Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2} className='my-auto'>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col
                          className='my-auto mt-4-sm'
                          style={{ fontSize: '0.85rem' }}
                        >
                          <Link to={`/product/${item.product}`}>
                            {item.name.length > 27
                              ? `${item.name.slice(0, 27)}...`
                              : `${item.name}`}
                          </Link>
                        </Col>
                        <Col
                          md={4}
                          className='my-auto mt-4-sm'
                          style={{ fontSize: item.price > 1000 && '0.85rem' }}
                        >
                          {item.qty} * {item.price.toLocaleString('he-IL')} ₪ ={' '}
                          {(item.qty * item.price).toLocaleString('he-IL')} ₪
                        </Col>
                        <Col md={2} className='my-auto mt-4-sm'>
                          <Form.Control
                            className='form-control-lg form-control-md form-control-small'
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
                        <Col md={1} className='text-center my-auto'>
                          <i
                            className='fas fa-trash mt-4-sm icon-md'
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
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>סיכום ההזמנה</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>סה"כ מוצרים:</Col>
                  <Col>
                    <NumberFormat
                      value={cart.itemsPrice}
                      displayType={'text'}
                      thousandSeparator={true}
                    />{' '}
                    ₪
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>דמי משלוח:</Col>
                  <Col>{cart.shippingPrice} ₪</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>סה"כ לתשלום:</Col>
                  <Col>
                    <NumberFormat
                      value={cart.totalPrice}
                      displayType={'text'}
                      thousandSeparator={true}
                    />{' '}
                    ₪
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-brand btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  ביצוע ההזמנה
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
