import axios from 'axios'
//import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

/**
 * ACTION CREATORS
 */
export const getCart = cart => ({type: GET_CART, cart})

/**
 * INITIAL STATE
 */

const blankCart = {}

/**
 * THUNK CREATORS
 */
export const fetchCart = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/cart`)
    dispatch(getCart(data || blankCart))
  } catch (err) {
    console.error(err)
  }
}

export const addToCart = (productId, orderId) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/orders/additemtocart/${orderId}`, {
      productId
    })
    dispatch(getCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const removeFromCart = (productId, orderId) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/orders/removeitemfromcart`, {
      productId,
      orderId
    })
    dispatch(getCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const removeLineItem = (productId, orderId) => async dispatch => {
  try {
    const {data} = await axios.put('api/orders/removeLineItemFromCart', {
      productId,
      orderId
    })
    dispatch(getCart(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default (state = blankCart, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
