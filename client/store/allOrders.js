import axios from 'axios'

const SET_ORDERS = 'SET_ORDERS'

export const setOrders = orders => ({type: SET_ORDERS, orders})

export const fetchAllOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders')
      dispatch(setOrders(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = []

export const order = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
    default:
      return state
  }
}
