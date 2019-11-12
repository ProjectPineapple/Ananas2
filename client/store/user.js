import axios from 'axios'
import history from '../history'
import {getCart, fetchCart} from './viewCart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const CHANGE_USER = 'CHANGE_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
export const getUser = user => ({type: GET_USER, user}) // if creating users when they order things and tracking them by email, need this elsewhere
const removeUser = () => ({type: REMOVE_USER})
export const changeUser = user => ({type: CHANGE_USER, user})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    if (method === 'signup') {
      // mailgun sent verification email on the backend

      history.push(`/checkYourEmail`)
    } else {
      dispatch(getUser(res.data))
      const {data: mergedCart} = await axios.put('/api/orders/mergecarts')
      console.log(mergedCart)
      dispatch(getCart(mergedCart))
      history.push('/home')
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    dispatch(fetchCart())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const updateUser = (user, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${userId}`, user)
      dispatch(changeUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const verifyUser = (email, code) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/auth/verify/`, {email, code})
      dispatch(logout())
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case CHANGE_USER:
      return action.user
    default:
      return state
  }
}
