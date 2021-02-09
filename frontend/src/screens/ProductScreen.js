import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap'
import axios from 'axios'
import Rating from '../components/Rating'
import AddToCartBtn from '../components/AddToCartBtn'

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`)

      setProduct(data)
    }

    fetchProduct()
  }, [match])

  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>
        חזרה
      </Link>
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
              <strong>{product.price} ש"ח</strong>
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
                    <strong style={{ fontSize: '0.85rem' }}>
                      {product.price} ש"ח
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
              <ListGroup.Item>
                <AddToCartBtn disabled={product.countInStock === 0} />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
