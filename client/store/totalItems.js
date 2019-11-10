import axios from 'axios'

const SET_PAGES = 'SET_PAGES'

export const setTotalItems = number => ({type: SET_PAGES, number})

const initialState = 1

export const itemCount = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGES:
      return action.number
    default:
      return state
  }
}

export default itemCount
