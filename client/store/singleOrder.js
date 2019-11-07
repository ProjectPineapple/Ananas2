import axios from 'axios'

const SET_ORDER = 'SET_ORDER'
const ADD_TO_ORDER = 'ADD_TO_ORDER'

export const setOrder = order => ({type: SET_ORDER, order})
export const addToOrder = product => ({type: ADD_TO_ORDER, product})

export const fetchAllOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders/:orderId')
      dispatch(setOrder(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const addOrderItem = (orderId, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products/:productId')
      dispatch(addToOrder(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {}

const singleOrder = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER:
      return action.order
    case ADD_TO_ORDER:
      return [...state, action.product]
    default:
      return state
  }
}

export default singleOrder
