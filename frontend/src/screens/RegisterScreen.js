import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Spinner from '../components/layout/Spinner'
import { register, login } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const [googleEmail, setGoogleEmail] = useState('')
  const [googleId, setGoogleId] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(false)

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

    if (error === 'המשתמש קיים' && googleEmail !== '') {
      setLoginSuccess(true)
      dispatch(login(googleEmail, googleId))
      history.push('/')
    }
  }, [
    history,
    userInfo,
    redirect,
    error,
    email,
    dispatch,
    googleEmail,
    googleId,
  ])

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

  const googleLogin = (response) => {
    const {
      profileObj: { email, name },
      googleId,
    } = response

    setGoogleEmail(email)
    setGoogleId(googleId)

    if (email) {
      setLoginSuccess(true)
      dispatch(register(name, email, googleId))
    } else {
      setMessage('חלה שגיאה. יש לנסות שוב')
      setTimeout(() => {
        setMessage(null)
      }, 2500)
    }
  }

  return (
    <>
      <Helmet>
        <title>זץ | הרשמה</title>
      </Helmet>
      <FormContainer>
        {message && (
          <Message variant='danger' classN='alert-register'>
            {message}
          </Message>
        )}
        {!loginSuccess && error && (
          <Message variant='danger' classN='alert-register'>
            {error}
          </Message>
        )}
        {loading && <Spinner />}
        {/* <GoogleLogin
          clientId='816282195701-kdd4l2l5bnun3kbpsq8kqcusfb1cjkcr.apps.googleusercontent.com'
          onSuccess={googleLogin}
          onFailure={googleLogin}
          buttonText='הרשמה באמצעות Google'
          className='google-login mt-4'
        />
        <h1>או הרשמה לאתר</h1> */}
        <h1>הרשמה</h1>
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
          <Button className='btn-brand mt-3' type='submit'>
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
    </>
  )
}

export default RegisterScreen
