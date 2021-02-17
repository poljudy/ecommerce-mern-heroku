import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children, classN, dismissible }) => {
  const [show, setShow] = useState(true)

  if (show) {
    return (
      <Alert
        variant={variant}
        className={`${classN}`}
        onClose={() => setShow(false)}
        dismissible={dismissible}
      >
        {children}
      </Alert>
    )
  }
  return <></>
}

Message.defaultProps = {
  variant: 'info',
  classN: 'alert',
  dismissible: true,
}

export default Message
