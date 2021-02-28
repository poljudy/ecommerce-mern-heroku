import React, { useEffect } from 'react'
import { Table, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import NumberFormat from 'react-number-format'
import { Helmet } from 'react-helmet'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Spinner from '../components/layout/Spinner'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductsListScreen = ({ history, match }) => {
  const pageNumber = match.params.pagenumber || 1

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, message, pages, page } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const { loading: loadingDelete, error: deleteError } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    product: createdProduct,
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate

  const productUpdate = useSelector((state) => state.productUpdate)
  const { error: errorUpdate, success } = productUpdate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || (userInfo && !userInfo.isAdmin)) {
      history.push('/')
      return
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [dispatch, userInfo, history, successCreate, createdProduct, pageNumber])

  const deleteHandler = (id) => {
    if (window.confirm('האם אתם בטוחים שברצונכם למחוק את המוצר?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <Helmet>
        <title>זץ | רשימת מוצרים</title>
      </Helmet>
      <Row className='align-items-center'>
        <Col>
          <h1 style={{ color: '#AAAAAA' }}>רשימת מוצרים</h1>
        </Col>
        <Col className='text-left'>
          <Button className='my-3 btn btn-brand' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> הוספת מוצר
          </Button>
        </Col>
      </Row>
      {loading || loadingCreate ? (
        <Spinner />
      ) : (
        <>
          {message && (
            <Message
              variant='success'
              dismissible={false}
              classN='alert-product-screen'
            >
              {message}
            </Message>
          )}

          {success && (
            <Message
              variant='success'
              dismissible={false}
              classN='alert-product-screen'
            >
              המוצר עודכן בהצלחה
            </Message>
          )}

          {deleteError && (
            <Message
              variant='danger'
              dismissible={true}
              classN='alert-product-screen'
            >
              {deleteError}
            </Message>
          )}

          {errorUpdate && (
            <Message
              variant='danger'
              dismissible={true}
              classN='alert-product-screen'
            >
              {errorUpdate}
            </Message>
          )}

          {errorCreate && (
            <Message
              variant='danger'
              dismissible={true}
              classN='alert-product-screen'
            >
              {errorCreate}
            </Message>
          )}

          {error ? (
            <Message variant='danger' dismissible={false}>
              {error}
            </Message>
          ) : loadingDelete ? (
            <Spinner />
          ) : (
            <>
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
                    <th>מק"ט</th>
                    <th style={{ textAlign: 'right' }}>שם</th>
                    <th>מחיר</th>
                    <th style={{ width: '6rem' }}>כמות במלאי</th>
                    <th className='hide-sm hide-md'>קטגוריה</th>
                    <th className='hide-sm hide-md'>יצרן</th>
                    <th>מפורסם</th>
                    <th className='hide-sm'>מחיקה</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    products &&
                    products.map((product) => (
                      <tr key={product._id}>
                        <td
                          onClick={() =>
                            history.push(`/admin/product/${product._id}/edit`)
                          }
                          className='product-link'
                        >
                          {product._id.slice(17, 24)}
                        </td>
                        <td
                          onClick={() =>
                            history.push(`/admin/product/${product._id}/edit`)
                          }
                          className='product-link text-right'
                        >
                          {product.name}
                        </td>
                        <td
                          onClick={() =>
                            history.push(`/admin/product/${product._id}/edit`)
                          }
                          className='product-link'
                        >
                          <NumberFormat
                            value={product.price}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                        </td>
                        <td
                          onClick={() =>
                            history.push(`/admin/product/${product._id}/edit`)
                          }
                          className='product-link'
                        >
                          {product.countInStock}
                        </td>
                        <td
                          onClick={() =>
                            history.push(`/admin/product/${product._id}/edit`)
                          }
                          className='product-link hide-sm hide-md'
                        >
                          {product.category}
                        </td>
                        <td
                          onClick={() =>
                            history.push(`/admin/product/${product._id}/edit`)
                          }
                          className='product-link hide-sm hide-md'
                        >
                          {product.brand}
                        </td>
                        <td>
                          {product.published ? (
                            <i
                              className='fas fa-check'
                              style={{ color: '#3fa63f' }}
                            ></i>
                          ) : (
                            <i
                              className='fas fa-times'
                              style={{
                                color: '#e9352f',
                              }}
                            ></i>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }} className='hide-sm'>
                          <i
                            className='fas fa-trash-alt'
                            style={{
                              color: '#e9352f',
                              cursor: 'pointer',
                            }}
                            onClick={() => deleteHandler(product._id)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <Paginate pages={pages} page={page} isAdmin={true} />
            </>
          )}
        </>
      )}
    </>
  )
}

export default ProductsListScreen
