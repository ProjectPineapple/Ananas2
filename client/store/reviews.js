import axios from 'axios'

const SET_REVIEWS = 'SET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'

const setReviews = reviews => ({type: SET_REVIEWS, reviews})
const addReview = review => ({type: ADD_REVIEW, review})

const initialState = []

export const fetchAllReviews = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/reviews')
      dispatch(setReviews(data))
      console.log('Greetings from thunk: ', data)
    } catch (err) {
      console.error(err)
    }
  }
}

export const addAReview = (review, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('api/reviews', {
        review: review,
        productId: productId
      })
      dispatch(addReview(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const allReviews = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return action.reviews
    case ADD_REVIEW:
      return [...state, action.review]
    default:
      return state
  }
}

export default allReviews
