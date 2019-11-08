import axios from 'axios'

const SET_USER_ORDERS = 'SET_USER_ORDERS'
const RESET_USER_ORDERS = 'RESET_USER_ORDERS'

export const setUserOrders = orders => ({type: SET_USER_ORDERS, orders})
export const resetUserOrders = () => ({type: RESET_USER_ORDERS})

export const fetchUserOrders = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/ownedbyuser/${userId}`)
      dispatch(setUserOrders(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = []

const userOrders = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ORDERS:
      return action.orders
    case RESET_USER_ORDERS:
      return initialState
    default:
      return state
  }
}
export default userOrders
