import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ value, text, isSmall, my }) => {
  return (
    <div className={`rating ${my} ${isSmall ? 'small' : ''}`}>
      <span>
        <i
          className={`${
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          } star`}
        ></i>
      </span>
      <span>
        <i
          className={`${
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          } star`}
        ></i>
      </span>
      <span>
        <i
          className={`${
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          } star`}
        ></i>
      </span>
      <span>
        <i
          className={`${
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          } star`}
        ></i>
      </span>
      <span>
        <i
          className={`${
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          } star`}
        ></i>
      </span>
      <span>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  isSmall: true,
  my: 'my-3',
}

Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string.isRequired,
  isSmall: PropTypes.bool,
}

export default Rating
