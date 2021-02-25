import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_RESET_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDERS_RESET,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  GET_ALL_ORDERS_RESET,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_CLEAR_MESSAGE,
  ORDER_DETAILS_RESET,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: payload,
      }
    case ORDER_RESET_SUCCESS:
      return {
        ...state,
        success: false,
      }
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ORDER_DETAILS_RESET:
      return {
        loading: true,
        orderItems: [],
        shippingAddress: {},
      }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderDeliveredReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case ORDER_DELIVERED_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DELIVERED_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_DELIVERED_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ORDER_DELIVERED_RESET:
      return {}
    default:
      return state
  }
}

export const orderListMyReducer = (
  state = { orders: [], message: '' },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_LIST_MY_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload,
      }
    case ORDER_DELETE_SUCCESS:
      return {
        ...state,
        message: payload.message,
        orders: state.orders.filter((order) => order._id !== payload.id),
      }
    case ORDER_DELETE_CLEAR_MESSAGE:
      return {
        ...state,
        message: '',
      }
    case ORDER_LIST_MY_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case ORDER_LIST_MY_RESET:
      return {
        orders: [],
        message: '',
      }
    default:
      return state
  }
}

export const getOrdersReducer = (
  state = { orders: [], success: false, message: '' },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        orders: payload,
      }
    case ORDER_DELETE_SUCCESS:
      return {
        ...state,
        message: payload.message,
        orders: state.orders.filter((order) => order._id !== payload.id),
      }
    case ORDER_DELETE_CLEAR_MESSAGE:
      return {
        ...state,
        message: '',
      }
    case GET_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case GET_ORDERS_RESET:
      return {
        orders: [],
        success: false,
      }
    default:
      return state
  }
}

export const ordersListReducer = (
  state = { orders: [], success: false },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case GET_ALL_ORDERS_REQUEST:
      return {
        loading: true,
      }
    case GET_ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: payload,
      }
    case ORDER_DELETE_SUCCESS:
      return {
        ...state,
        message: payload.message,
        orders: state.orders.filter((order) => order._id !== payload.id),
      }
    case ORDER_DELETE_CLEAR_MESSAGE:
      return {
        ...state,
        message: '',
        loading: false,
      }
    case GET_ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case GET_ALL_ORDERS_RESET:
      return {
        orders: [],
        success: false,
      }
    default:
      return state
  }
}

export const orderDeleteReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case ORDER_DELETE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DELETE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ORDER_DELETE_CLEAR_MESSAGE:
      return {}
    default:
      return state
  }
}
