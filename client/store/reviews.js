import axios from 'axios'

const SET_REVIEWS = 'SET_REVIEWS'

const setReviews = reviews => ({type: SET_REVIEWS, reviews})

const initialState = []

export const fetchAllReviews = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/reviews')
      dispatch(setReviews(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const allReviews = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return action.reviews
    default:
      return state
  }
}

export default allReviews
