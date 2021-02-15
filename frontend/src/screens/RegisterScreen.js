import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Spinner from '../components/layout/Spinner'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error } = userRegister

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('הסיסמאות אינן תואמות')
      setTimeout(() => {
        setMessage(null)
      }, 2500)
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>הרשמה</h1>
      {message && (
        <Message variant='danger' classN='alert-wide'>
          {message}
        </Message>
      )}
      {error && (
        <Message variant='danger' classN='alert-wide'>
          {error}
        </Message>
      )}
      {loading && <Spinner />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>שם מלא</Form.Label>
          <Form.Control
            type='name'
            placeholder='שם פרטי ושם משפחה'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>כתובת דוא"ל</Form.Label>
          <Form.Control
            type='email'
            placeholder='דואר אלקטרוני'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>סיסמה</Form.Label>
          <Form.Control
            type='password'
            placeholder='סיסמה'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>אימות סיסמה</Form.Label>
          <Form.Control
            type='password'
            placeholder='אימות סיסמה'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button className='btn-brand' type='submit'>
          הרשמה
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          לקוח קיים?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            כניסה
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
