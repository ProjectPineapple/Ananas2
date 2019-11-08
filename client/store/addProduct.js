/* eslint-disable complexity */
import axios from 'axios'
import {addProduct} from './allProducts'
import {changeProduct} from './singleProduct'

const SET_NAME = 'SET_NAME'
const SET_PRICE = 'SET_PRICE'
const SET_STOCK = 'SET_STOCK'
const SET_TAG1 = 'SET_TAG1'
const SET_TAG2 = 'SET_TAG2'
const SET_TAG3 = 'SET_TAG3'
const SET_PHOTO1 = 'SET_PHOTO1'
const SET_PHOTO2 = 'SET_PHOTO2'
const SET_PHOTO3 = 'SET_PHOTO3'
const SET_DESCRIPTION = 'SET_DESCRIPTION'
const RESET_FORM = 'RESET_FORM'

const blankProduct = {
  name: '',
  price: '',
  stock: '',
  tags: [],
  photos: [],
  description: ''
}

export const setName = name => ({type: SET_NAME, name})
export const setPrice = price => ({type: SET_PRICE, price})
export const setStock = stock => ({type: SET_STOCK, stock})
export const setTag1 = tag1 => ({type: SET_TAG1, tag1})
export const setTag2 = tag2 => ({type: SET_TAG2, tag2})
export const setTag3 = tag3 => ({type: SET_TAG3, tag3})
export const setPhoto1 = photo1 => ({type: SET_PHOTO1, photo1})
export const setPhoto2 = photo2 => ({type: SET_PHOTO2, photo2})
export const setPhoto3 = photo3 => ({type: SET_PHOTO3, photo3})
export const setDescription = description => ({
  type: SET_DESCRIPTION,
  description
})
export const resetForm = () => ({type: RESET_FORM})

export const addAProduct = formData => {
  return async dispatch => {
    const {data} = await axios.post('/api/products', {formData})
    dispatch(addProduct(data))
  }
}

export const changeAProduct = (formData, productId) => {
  return async dispatch => {
    const {data} = await axios.put(`/api/products/${productId}`, {formData})
    dispatch(changeProduct(data))
  }
}

export default function(state = blankProduct, action) {
  switch (action.type) {
    case SET_NAME:
      return {...state, name: action.name}
    case SET_PRICE:
      return {...state, price: action.price}
    case SET_STOCK:
      return {...state, stock: action.stock}
    case SET_TAG1:
      return {...state, tags: [...state.tags, action.tag1]}
    case SET_TAG2:
      return {...state, tags: [...state.tags, action.tag2]}
    case SET_TAG3:
      return {...state, tags: [...state.tags, action.tag3]}
    case SET_PHOTO1:
      return {...state, photos: [...state.photos, action.photo1]}
    case SET_PHOTO2:
      return {...state, photos: [...state.photos, action.photo2]}
    case SET_PHOTO3:
      return {...state, photos: [...state.photos, action.photo3]}
    case SET_DESCRIPTION:
      return {...state, description: action.description}
    case resetForm:
      return blankProduct
    default:
      return state
  }
}
