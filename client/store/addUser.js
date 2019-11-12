import React from 'react'
import axios from 'axios'
import {formValueSelector, formValues} from 'redux-form'

const UPDATE_USER = 'UPDATE_USER'

export const updateUser = user => ({type: UPDATE_USER, user})

export const changeAUser = (values, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${userId}`, values)
      dispatch(updateUser(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}
