import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Form } from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import Rating from '../components/Rating'
import AddToCartBtn from '../components/AddToCartBtn'
import { listProductDetails } from '../actions/productActions'
import Spinner from '../components/layout/Spinner'
import Message from '../components/Message'

const ProductScreen = ({ match }) => {
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)

  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, product.price])

  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>
        חזרה
      </Link>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={` מ-${product.numReviews} ביקורות`}
                  isSmall={false}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>
                  <NumberFormat
                    value={product.price}
                    displayType={'text'}
                    thousandSeparator={true}
                  />{' '}
                  ש"ח
                </strong>
              </ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>מחיר:</Col>
                    <Col>
                      <strong
                        style={{ fontSize: product.price > 999 && '0.85rem' }}
                      >
                        <NumberFormat
                          value={product.price}
                          displayType={'text'}
                          thousandSeparator={true}
                        />{' '}
                        ש"ח
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>סטטוס:</Col>
                    <Col>
                      {product.countInStock > 0 ? `קיים במלאי` : `חסר במלאי`}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>כמות: </Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <AddToCartBtn
                    disabled={product.countInStock === 0}
                    id={product._id}
                    qty={qty}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
