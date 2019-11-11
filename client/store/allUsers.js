import axios from 'axios'

const SET_USERS = 'SET_USERS'

export const setUsers = users => ({type: SET_USERS, users})

export const fetchAllUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(setUsers(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = []

const allUsers = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}

export default allUsers
