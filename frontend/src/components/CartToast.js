import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Row, Toast, Col } from 'react-bootstrap'

const CartToast = () => {
  const [show, setShow] = useState(true)

  const cart = useSelector((state) => state.cart)

  const { message } = cart

  return (
    <Row>
      <Col xs={6}>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          className='toast toast-sm toast-md'
        >
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  )
}

export default CartToast
