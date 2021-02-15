import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [history, userInfo, dispatch, user, success])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('הסיסמאות אינן תואמות')
      setTimeout(() => {
        setMessage(null)
      }, 2500)
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 1500)
    }
  }

  return (
    <>
      <h1>
        <strong>אזור אישי</strong>
      </h1>
      <Row>
        <Col md={5}>
          <h2>פרטים אישיים</h2>
          {message && (
            <Message variant='danger' classN='alert-wide'>
              {message}
            </Message>
          )}
          {success && (
            <Message variant='success' classN='alert-wide'>
              הפרטים עודכנו בהצלחה
            </Message>
          )}
          {error && (
            <Message variant='danger' classN='alert-wide'>
              {error}
            </Message>
          )}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>שם מלא</Form.Label>
              <Form.Control
                type='name'
                placeholder='שם פרטי ושם משפחה'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>כתובת דוא"ל</Form.Label>
              <Form.Control
                type='email'
                placeholder='דואר אלקטרוני'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>סיסמה</Form.Label>
              <Form.Control
                type='password'
                placeholder='סיסמה'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>אימות סיסמה</Form.Label>
              <Form.Control
                type='password'
                placeholder='אימות סיסמה'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button className='btn-brand btn-profile' type='submit'>
              עדכון
            </Button>
          </Form>
        </Col>
        <Col md={7}>
          <h2>ההזמנות שלי</h2>
        </Col>
      </Row>
    </>
  )
}

export default ProfileScreen
