import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

const setProducts = products => ({type: SET_PRODUCTS, products})
export const addProduct = product => ({type: ADD_PRODUCT, product})

const initialState = []

export const fetchAllProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(setProducts(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const createProduct = product => {
  return async dispatch => {
    try {
      console.log(product)
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
