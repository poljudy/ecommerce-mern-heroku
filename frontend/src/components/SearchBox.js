import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <div className='input-group input-group-xs'>
        <input
          type='text'
          name='q'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='חיפוש מוצרים...'
          className='mr-sm-2 ml-sm-3 form-control'
        />
        {keyword && (
          <span className='input-group-btn'>
            <i
              className='fas fa-times'
              style={{ cursor: 'pointer' }}
              onClick={() => {
                history.push('/')
                setKeyword('')
              }}
            ></i>
          </span>
        )}
      </div>
      <Button type='submit' variant='outline-success' className='p-2'>
        חיפוש
      </Button>
    </Form>
  )
}

export default SearchBox
