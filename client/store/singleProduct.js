import axios from 'axios'

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

const setSingleProduct = product => ({type: SET_SINGLE_PRODUCT, product})
const removeProduct = productId => ({type: REMOVE_PRODUCT, productId})
const updateProduct = product => ({type: UPDATE_PRODUCT, product})

export const fetchSingleProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(setSingleProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const deleteProduct = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(removeProduct(productId))
    } catch (err) {
      console.log(err)
    }
  }
}
export const changeProduct = (product, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${productId}`, product)
      dispatch(updateProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = null

const singleProduct = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product
    case REMOVE_PRODUCT:
      return initialState
    case UPDATE_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default singleProduct
