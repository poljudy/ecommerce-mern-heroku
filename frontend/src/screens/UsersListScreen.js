import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Message from '../components/Message'
import Spinner from '../components/layout/Spinner'
import { listUsers, deleteUser } from '../actions/userActions'

const UsersListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userList = useSelector((state) => state.userList)
  const { loading, error, users, success } = userList

  const userDelete = useSelector((state) => state.userDelete)
  const { error: deleteError } = userDelete

  const userUpdate = useSelector((state) => state.userUpdate)
  const { success: successUpdate } = userUpdate

  useEffect(() => {
    if (!userInfo || (userInfo && !userInfo.isAdmin)) {
      history.push('/')
      return
    }

    dispatch(listUsers())
  }, [dispatch, userInfo, history])

  const deleteHandler = (id) => {
    if (window.confirm('האם אתם בטוחים שברצונכם למחוק את המשתמש?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <Helmet>
        <title>זץ | רשימת משתמשים</title>
      </Helmet>
      <h1 style={{ color: '#AAAAAA' }}>רשימת משתמשים</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {success && (
            <Message
              variant='success'
              dismissible={false}
              classN='alert-user-list'
            >
              המשתמש הוסר בהצלחה
            </Message>
          )}

          {successUpdate && (
            <Message
              variant='success'
              dismissible={false}
              classN='alert-user-list'
            >
              המשתמש עודכן בהצלחה
            </Message>
          )}

          {error ? (
            <Message variant='danger' dismissible={false}>
              {error}
            </Message>
          ) : deleteError ? (
            <Message variant='danger' dismissible={true}>
              {deleteError}
            </Message>
          ) : (
            <Table
              striped
              bordered
              hover
              responsive
              className='table-sm'
              style={{ color: '#AAAAAA' }}
            >
              <thead>
                <tr style={{ textAlign: 'center' }}>
                  <th className='hide-sm'>זיהוי משתמש</th>
                  <th>שם</th>
                  <th className='hide-sm'>דוא"ל</th>
                  <th>מנהל מערכת</th>
                  <th>קיימות הזמנות</th>
                  <th>קיימת הזמנה משולמת</th>
                  <th>עריכת/מחיקת משתמש</th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  users &&
                  users.map((user) => (
                    <tr key={user._id}>
                      <td className='hide-sm'>{user._id.slice(17, 24)}</td>
                      <td>{user.name}</td>
                      <td className='hide-sm'>
                        <a
                          href={`mailto:${user.email}`}
                          style={{ color: '#AAAAAA' }}
                        >
                          {user.email}
                        </a>
                      </td>
                      <td>
                        {user.isAdmin ? (
                          <i
                            className='fas fa-user-shield'
                            style={{ color: '#3fa63f' }}
                          />
                        ) : (
                          <i
                            className='fas fa-user-times'
                            style={{ color: '#e9352f' }}
                          />
                        )}
                      </td>
                      <td>
                        {user.hasOrders && (
                          <i
                            className='far fa-check-circle'
                            style={{ color: '#3fa63f' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {user.hasPaidOrders && (
                          <i
                            className='far fa-check-circle'
                            style={{ color: '#3fa63f' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer
                          to={`/admin/user/${user._id}/edit`}
                          style={{ cursor: 'pointer' }}
                        >
                          <i className='fas fa-edit'></i>
                        </LinkContainer>
                        {!user.hasPaidOrders ? (
                          <i
                            className='fas fa-trash-alt'
                            style={{
                              color: '#e9352f',
                              marginRight: '1.5rem',
                              verticalAlign: 'middle',
                              cursor: 'pointer',
                            }}
                            onClick={() => deleteHandler(user._id)}
                          ></i>
                        ) : (
                          <span title='לא ניתן למחוק לקוח בעל הזמנה משולמת'>
                            <i
                              className='fas fa-trash-alt'
                              style={{
                                color: '#AAAAAA',
                                marginRight: '1.5rem',
                                verticalAlign: 'middle',
                                cursor: 'not-allowed',
                              }}
                            ></i>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  )
}

export default UsersListScreen
