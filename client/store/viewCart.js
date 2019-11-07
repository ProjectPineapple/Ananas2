import axios from 'axios'
//import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})

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

export const addToCart = productToAdd => async dispatch => {
  try {
    const {data} = await axios.post(`/api/orders/cart`, productToAdd)
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

export const removeFromCart = productToDelete => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/orders/cart`, productToDelete)
    console.log(data)
  } catch (err) {
    console.log(err)
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
