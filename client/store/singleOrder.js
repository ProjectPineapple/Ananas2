import axios from 'axios'

const SET_ORDER = 'SET_ORDER'
const RESET_ORDER = 'RESET_ORDER'
const ADD_TO_ORDER = 'ADD_TO_ORDER'

export const setOrder = order => ({type: SET_ORDER, order})

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
