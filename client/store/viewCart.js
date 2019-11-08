import axios from 'axios'
//import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADDTO_CART = 'ADDTO_CART'

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const addToCart = product => ({type: ADDTO_CART, product})

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

export const addToCartThunk = (productId, orderLineItems) => async dispatch => {
  try {
    console.log(
      "Greetings from thunk! Here's what I got: ",
      productId,
      orderLineItems
    )
    const orderId = orderLineItems[0].orderId
    const {data} = await axios.put(`/api/orders/${orderId}`, {
      productId: productId
    })
    console.log('Thunk sending this back', data)
    dispatch(addToCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const removeFromCart = productToDelete => async dispatch => {
  try {
    console.log(
      "Greetings from thunk! Here's what I got: ",
      productId,
      orderLineItems
    )
    const orderId = orderLineItems[0].orderId
    const {data} = await axios.put(`/api/orders/${orderId}`, {
      productId: productId
    })
    console.log('Thunk sending this back', data)
    dispatch(addToCart(data))
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
    case ADDTO_CART:
      return {...state, products: {...action.product}}
    default:
      return state
  }
}
