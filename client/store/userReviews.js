import axios from 'axios'

const GET_USER_REVIEWS = 'GET_USER_REVIEWS'

export const getUserReviews = reviews => ({type: GET_USER_REVIEWS, reviews})

const initialState = []

export const fetchUserReviews = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/reviews/ownedbyuser/${userId}`)
      dispatch(getUserReviews(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const userReviews = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REVIEWS:
      return action.reviews
    default:
      return state
  }
}

export default userReviews
