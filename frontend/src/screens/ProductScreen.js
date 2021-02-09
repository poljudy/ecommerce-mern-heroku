import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

const ProductScreen = ({ match }) => {
  const product = products.find((product) => product._id === match.params.id)
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
                <Button
                  className='btn-block btn-brand'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  להוסיף לעגלה
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
