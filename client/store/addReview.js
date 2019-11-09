import axios from 'axios'

const ADD_REVIEW = 'ADD_REVIEW'

const addReview = addedReview => ({type: ADD_REVIEW, addedReview})

const initialState = {}

export const addReviewThunk = (review, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/reviews', {
        review: review,
        productId: productId
      })
      dispatch(addReview(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const addAReview = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return action.addedReview
    default:
      return state
  }
}

export default addAReview
