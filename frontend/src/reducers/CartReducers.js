import {
  CART_ADD_ITEM,
  CART_REMOVE_TOAST,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/CartConstants'

export const cartReducer = (
  state = {
    cartItems: [],
    toast: false,
    message: '',
    shippingAddress: {},
    paymentMethod: '',
  },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case CART_ADD_ITEM:
      const item = payload.item

      const existItem = state.cartItems.find((i) => i.product === item.product)

      if (existItem) {
        return {
          ...state,
          message: payload.message,
          toast: true,
          cartItems: state.cartItems.map((i) =>
            i.product === existItem.product ? item : i
          ),
        }
      } else {
        return {
          ...state,
          message: payload.message,
          toast: true,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        message: payload.message,
        toast: true,
        cartItems: state.cartItems.filter(
          (item) => item.product !== payload.product
        ),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      }
    case CART_REMOVE_TOAST:
      return {
        ...state,
        toast: false,
      }
    default:
      return state
  }
}
