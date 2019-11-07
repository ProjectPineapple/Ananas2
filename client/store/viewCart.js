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

    if (orderLineItems.includes(productId)) {
      const {data} = await axios.put(`/api/orders/${orderLineItems.orderId}`, {
        productId: productId
      })
      dispatch(addToCart(data))
    } else {
      const {data} = await axios.post(`/api/orders/${orderLineItems.orderId}`, {
        productId: productId
      })
      dispatch(addToCart(data))
    }
    // await OrderLineItem.find({where: {productId: productId}})
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
    case ADDTO_CART:
      return {...state, products: action.product}
    default:
      return state
  }
}
