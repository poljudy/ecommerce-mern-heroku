import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_TOAST,
  CART_REMOVE_ITEM,
} from '../constants/CartConstants'

export const addToCart = (id, qty, message = 'הפריט נוסף לעגלה') => async (
  dispatch,
  getState
) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      item: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
      message,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const hideToast = () => (dispatch) => {
  dispatch({
    type: CART_REMOVE_TOAST,
  })
}

export const removeFromCart = (id, message) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: {
      message,
      product: id,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
