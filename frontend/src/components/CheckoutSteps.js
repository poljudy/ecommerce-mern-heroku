import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4, isCartScreen }) => {
  return (
    <Nav
      className={`justify-content-right mr-n3 ${
        isCartScreen ? `mb-n3 mt-1` : 'mb-4'
      }`}
    >
      <Nav.Item>
        {step1 && (
          <LinkContainer to='/cart'>
            <Nav.Link>עגלת קניות</Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>כתובת למשלוח</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>כתובת למשלוח</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>בחירת שיטת תשלום</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>בחירת שיטת תשלום</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>ביצוע ההזמנה</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>ביצוע ההזמנה</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

CheckoutSteps.defaultProps = {
  isCartScreen: false,
}

export default CheckoutSteps
