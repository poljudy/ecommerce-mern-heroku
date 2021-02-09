import { Card } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} vatiant='top' alt={product.name} />
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={` מ-${product.numReviews} ביקורות`}
          />
        </Card.Text>
        <Card.Text as='h5'>{product.price} ש"ח</Card.Text>
      </Card.Body>
    </Card>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
}

export default Product
