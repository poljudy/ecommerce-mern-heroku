import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Row, Col, Image, ListGroup, Card, Form, Button } from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import Rating from '../components/Rating'
import AddToCartBtn from '../components/AddToCartBtn'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Spinner from '../components/layout/Spinner'
import Message from '../components/Message'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productCreateReview = useSelector((state) => state.productCreateReview)
  const { error: errorReview, success: successReview } = productCreateReview

  useEffect(() => {
    if (successReview) {
      setTimeout(() => {
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
      }, 2000)
    }
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successReview])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  const user =
    userInfo &&
    product &&
    product.reviews.find((review) => review.user === userInfo._id)

  return (
    <>
      <Helmet>
        <title>
          {!product ? `זץ - כי לקנות פה יתן לך זץ` : `זץ | ${product.name}`}
        </title>
      </Helmet>
      <Button onClick={() => history.goBack()} className='mb-3'>
        חזרה
      </Button>

      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant='danger' dismissible={false}>
          {error}
        </Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
              {errorReview ? (
                <Message variant='danger' dismissible={true} classN='mt-5'>
                  {errorReview}
                </Message>
              ) : successReview ? (
                <Message variant='success' dismissible={false} classN='mt-5'>
                  הביקורת נוספה בהצלחה
                </Message>
              ) : (
                <ListGroup className='mt-3' variant='flush'>
                  <h2>ביקורות מוצר</h2>

                  {!userInfo ? (
                    <ListGroup.Item>
                      <Message dismissible={false} variant='brand'>
                        <span
                          className='link'
                          onClick={() => history.push('/login')}
                        >
                          התחברו
                        </span>{' '}
                        כדי להוסיף ביקורת
                      </Message>
                    </ListGroup.Item>
                  ) : userInfo && !user ? (
                    <ListGroup.Item>
                      <h5 className='my-3'>הוספת ביקורת על המוצר</h5>
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>ציון...</option>
                            <option value='1'>1 - גרוע</option>
                            <option value='2'>2 - סביר</option>
                            <option value='3'>3 - טוב</option>
                            <option value='4'>4 - טוב מאוד</option>
                            <option value='5'>5 - מצויין</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>תגובה</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          type='submit'
                          variant='brand'
                          className='btn btn-block mt-4_5'
                        >
                          הוספה
                        </Button>
                      </Form>
                    </ListGroup.Item>
                  ) : (
                    userInfo && user && <></>
                  )}
                  {product.reviews.length === 0 ? (
                    <ListGroup.Item className='mt-2'>
                      <Message dismissible={false} classN='alert-review'>
                        טרם נוספו ביקורות למוצר זה
                      </Message>
                    </ListGroup.Item>
                  ) : (
                    product.reviews
                      .sort((a, b) => a.createdAt - b.createdAt)
                      .reverse()
                      .map((review) => (
                        <ListGroup.Item key={review._id}>
                          <h5>{review.comment}</h5>
                          <Rating value={review.rating} my='mb-2' />
                          <strong>{review.name}</strong>
                          <p>
                            {new Date(
                              review.createdAt.substring(0, 10)
                            ).toLocaleDateString('he-IL')}
                          </p>
                        </ListGroup.Item>
                      ))
                  )}
                </ListGroup>
              )}
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
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
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
        </>
      )}
    </>
  )
}

export default ProductScreen
