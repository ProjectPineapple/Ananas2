import axios from 'axios'
import history from '../history'
import {getUser} from './user'

/**
 * ACTION TYPES
 */
const SET_EMAIL = 'SET_EMAIL'
const SET_BILLING_ADDRESS = 'SET_BILLING_ADDRESS'
const SET_MAILING_ADDRESS = 'SET_MAILING_ADDRESS'
const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD'
// const SET_ORDER_NUMBER = "SET_ORDER_INFO" // part of an action that takes place on mount
// maybe above line is just pulled from order and or cart reducer
const RESET_FORM = 'RESET_FORM'

/**
 * INITIAL STATE
 */
const blankForm = {
  email: '',
  billingAddress: '',
  mailingAddress: '',
  paymentMethod: ''
}

/**
 * ACTION CREATORS
 */

export const setEmail = email => ({type: SET_EMAIL, email})
export const setBillingAddress = billingAddress => ({
  type: SET_BILLING_ADDRESS,
  billingAddress
})
export const setMailingAddress = mailingAddress => ({
  type: SET_MAILING_ADDRESS,
  mailingAddress
})
export const setPaymentMethod = paymentMethod => ({
  type: SET_PAYMENT_METHOD,
  paymentMethod
})
export const resetForm = () => ({type: RESET_FORM})

/**
 * THUNK CREATORS
 */

//save user thunk goes here, for currently unauth users
//basically takes form data on submit and makes a user
// that user is then associated to this order,
// so we can track old orders related to this email
// at least thats how i envision it -Antanas
export const createUser = (formData, history) => {
  return async dispatch => {
    const {data: user} = await axios.post(
      'SOME_ROUTE_TO_USER_CREATION',
      formData
    )
    dispatch(getUser(user))
    history.push('HOMEPAGE')
  }
}

/**
 * REDUCER
 */
export default function(state = blankForm, action) {
  switch (action.type) {
    case SET_EMAIL:
      return {...state, email: action.email}
    case SET_BILLING_ADDRESS:
      return {...state, billingAddress: action.billingAddress}
    case SET_MAILING_ADDRESS:
      return {...state, mailingAddress: action.mailingAddress}
    case SET_PAYMENT_METHOD:
      return {...state, paymentMethod: action.paymentMethod}
    case RESET_FORM:
      return blankForm
    default:
      return state
  }
}