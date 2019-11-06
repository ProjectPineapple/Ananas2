import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'
const setProducts = products => ({type: SET_PRODUCTS, products})

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

export const allProducts = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default allProducts
