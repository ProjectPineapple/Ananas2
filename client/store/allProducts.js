import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'
const setProducts = products => ({type: SET_PRODUCTS, products})

const initialState = {
  products: []
}

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

export const allProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, products: action.products}
    default:
      return state
  }
}
