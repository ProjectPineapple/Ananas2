import React from 'react'
import axios from 'axios'
import {formValueSelector} from 'redux-form'

const UPDATE_USER = 'UPDATE_USER'

export const updateUser = user => ({type: UPDATE_USER, user})

export const changeAUser = (formData, productId) => {
  return async dispatch => {
    const {data} = await axios.put(`/api/products/${productId}`, formData)
    dispatch(updateUser(data))
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {...state, user: action.user}
    default:
      return state
  }
}
