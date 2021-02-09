import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const AddToCartBtn = ({ disabled }) => {
  return (
    <Button className='btn-block btn-brand' type='button' disabled={disabled}>
      להוסיף לעגלה
    </Button>
  )
}

AddToCartBtn.propTypes = {
  disabled: PropTypes.bool.isRequired,
}

export default AddToCartBtn
