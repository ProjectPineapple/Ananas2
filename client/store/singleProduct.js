import axios from 'axios'

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export const setSingleProduct = product => ({type: SET_SINGLE_PRODUCT, product})
export const removeProduct = productId => ({type: REMOVE_PRODUCT, productId})
export const updateProduct = product => ({type: UPDATE_PRODUCT, product})

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
export const changeProduct = (
  productId,
  productName,
  description,
  price,
  photos
) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${productId}`, {
        productName,
        description,
        price,
        photos
      })
      dispatch(updateProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  products: [],
  product: {}
}

export const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return {...state, product: action.product}
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => {
          return product.id !== action.productId
        })
      }
    case UPDATE_PRODUCT:
      const productIndex = state.products.findIndex(
        product => product.id === action.product.id
      )
      const updatedProducts = [...state.products]
      updatedProducts[productIndex] = action.product
      return {...state, products: updatedProducts}
    default:
      return state
  }
}
