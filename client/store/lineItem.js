import axios from 'axios'

const GET_ITEM = 'GET_ITEM'
const INCREMENT_ITEM = 'INCREMENT_ITEM'
const DECREMENT_ITEM = 'DECREMENT_ITEM'

const getItem = item => ({type: GET_ITEM, item})
const incItem = item => ({type: INCREMENT_ITEM, item})
const decItem = item => ({type: DECREMENT_ITEM, item})

const defaultItem = {}

export const incrementItem = itemToInc => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart`, {product: itemToInc, op: 'inc'})
    dispatch(getItem(data || defaultItem))
  } catch (err) {
    console.error(err)
  }
}

export const decrementItem = itemToDec => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart`, {product: itemToDec, op: 'dec'})
    dispatch(getItem(data || defaultItem))
  } catch (err) {
    console.error(err)
  }
}

export default (state = defaultItem, action) => {
  switch (action.type) {
    case GET_ITEM:
      return action.item
    /*    case INCREMENT_ITEM:
      return action.item
    case DECREMENT_ITEM:
      return action.item*/
    default:
      return state
  }
}
