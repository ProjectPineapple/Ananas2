import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllUsers} from '../../store/allUsers'
import {Link} from 'react-router-dom'

const AllUsers = props => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.allUsers)
  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  return users.length ? (
    <div>
      {users.map(user => (
        <div key={user.id} className="listing-users">
          <div className="user-name">
            <h3>
              <Link to={`/view/user/${user.id}`}>
                {' '}
                User #{user.id + ' '} {user.name}
              </Link>
            </h3>
          </div>
          <div className="user-information" />
          Admin Status: {user.status}
          <div />
        </div>
      ))}
    </div>
  ) : (
    <h1>No Users</h1>
  )
}

export default AllUsers
