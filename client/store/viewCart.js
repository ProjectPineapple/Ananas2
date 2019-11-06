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
    const {data} = await axios.get(`/api/cart`)
    dispatch(getCart(data || blankCart))
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
