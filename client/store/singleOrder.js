import axios from 'axios'

const SET_ORDER = 'SET_ORDER'
const RESET_ORDER = 'RESET_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'

export const setOrder = order => ({type: SET_ORDER, order})
export const resetOrder = () => ({type: RESET_ORDER})
export const updateOrder = order => ({type: UPDATE_ORDER, order})

/*export const fetchOrder = orderId => {
   return async dispatch => {
   try {
   const {data} = await axios.get(`/api/orders/?order=${orderId}`)
   dispatch(setOrder(data))
   } catch (err) {
   console.error(err)
   }
   }
   }*/
export const fetchSingleOrder = orderId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${orderId}`)
      dispatch(setOrder(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchOrderByUser = (orderId, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        `/api/orders/ownedbyuser/${userId}/${orderId}`
      )
      dispatch(setOrder(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const changeOrder = (order, orderId) => {
  return async dispatch => {
    console.log(order)
    try {
      orderId = Number(orderId)
      const {data} = await axios.put(`/api/orders/${orderId}`, order)
      dispatch(setOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {}

export const singleOrder = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER:
      return action.order
    default:
      return state
  }
}

export default singleOrder
