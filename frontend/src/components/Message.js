import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children, classN }) => {
  return (
    <Alert variant={variant} className={classN}>
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
  classN: 'alert',
}

export default Message
