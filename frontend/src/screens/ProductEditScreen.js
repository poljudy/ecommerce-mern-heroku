import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Button, Image, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Spinner from '../components/layout/Spinner'
import Loader from '../components/layout/Loader'
import {
  listProductDetails,
  updateProduct,
  deleteProduct,
} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [published, setPublished] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productDelete = useSelector((state) => state.productDelete)
  const { error: deleteError } = productDelete

  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success } = productUpdate

  useEffect(() => {
    if (!userInfo || (userInfo && !userInfo.isAdmin)) {
      history.push('/')
      return
    }

    if (success) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/products')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setDescription(product.description)
        setCountInStock(product.countInStock)
        setCategory(product.category)
        setBrand(product.brand)
        setPublished(product.published)
      }
    }
  }, [userInfo, dispatch, history, product, productId, success])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        description,
        countInStock,
        category,
        brand,
        published,
      })
    )
  }

  const deleteHandler = () => {
    if (window.confirm('האם אתם בטוחים שברצונכם למחוק את המוצר?')) {
      dispatch(deleteProduct(productId))
      history.push('/admin/products')
    }
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)

      setTimeout(() => {
        setUploaded(true)
        setUploading(false)
      }, 2000)
    } catch (err) {
      console.error(err)
      setUploading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>זץ | עריכת מוצר {!product ? '' : `"${product.name}"`} </title>
      </Helmet>
      <Button onClick={() => history.push('/admin/products')} className='mx-1'>
        חזרה
      </Button>

      {errorUpdate && (
        <Message
          variant='danger'
          classN='alert-product-screen'
          dismissible={true}
        >
          {errorUpdate}
        </Message>
      )}

      {deleteError && (
        <Message
          variant='danger'
          classN='alert-product-screen'
          dismissible={true}
        >
          {deleteError}
        </Message>
      )}

      {loadingUpdate ? (
        <Spinner />
      ) : loading ? (
        <Spinner />
      ) : error ? (
        <Message
          variant='danger'
          classN='alert-product-screen'
          dismissible={false}
        >
          {error}
        </Message>
      ) : (
        <>
          <FormContainer md={8}>
            <ListGroup>
              <ListGroup.Item>
                <h1 className='text-center'>עריכת מוצר</h1>
              </ListGroup.Item>
              <ListGroup.Item className='text-center'>
                <Image
                  src={image}
                  alt={name}
                  rounded
                  style={{ width: '100%' }}
                />
              </ListGroup.Item>

              <ListGroup.Item>
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='name'>
                    <Form.Label>שם</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='שם המוצר'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='price'>
                    <Form.Label>מחיר</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='מחיר'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='image'>
                    <Form.Label>נתיב התמונה</Form.Label>
                    <Form.Control
                      dir='ltr'
                      type='text'
                      placeholder='URL'
                      value={!uploaded ? image : ''}
                      onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                    {uploading ? (
                      <>
                        <h5 className='mt-4 text-center'>מעלה...</h5>
                        <Loader />
                      </>
                    ) : (
                      <>
                        <Form.Label className='mt-3'>או העלאת תמונה</Form.Label>
                        <Form.File
                          className='mb-1'
                          id='image-file'
                          label={uploaded ? image : ''}
                          custom
                          onChange={uploadFileHandler}
                        ></Form.File>
                      </>
                    )}
                  </Form.Group>

                  <Form.Group controlId='description'>
                    <Form.Label>תיאור</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      placeholder='תיאור'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='brand'>
                    <Form.Label>יצרן</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='יצרן'
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='category'>
                    <Form.Label>קטגוריה</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='קטגוריה'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='countInStock'>
                    <Form.Label>כמות במלאי</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='כמות במלאי'
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='published'>
                    <Form.Check
                      type='checkbox'
                      label='להצגה בדף הראשי'
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                    ></Form.Check>
                  </Form.Group>

                  <Button className='btn-brand btn-block mt-4_5' type='submit'>
                    עדכון
                  </Button>
                </Form>
                <Button
                  className='btn btn-danger btn-block mt-4_5'
                  onClick={deleteHandler}
                >
                  מחיקת המוצר
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </FormContainer>
        </>
      )}
    </>
  )
}

export default ProductEditScreen
