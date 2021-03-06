import axios from 'axios'
import {setTotalItems} from './totalItems'

const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

const setProducts = products => ({type: SET_PRODUCTS, products})
export const addProduct = product => ({type: ADD_PRODUCT, product})

const initialState = []

export const fetchAllProducts = urlQueryString => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products${urlQueryString}`)
      dispatch(setProducts(data.rows))
      dispatch(setTotalItems(data.count))
    } catch (err) {
      console.error(err)
    }
  }
}

export const createProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.post('api/products', product)
      dispatch(addProduct(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const allProducts = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}

export default allProducts
