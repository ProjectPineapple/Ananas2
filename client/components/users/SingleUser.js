import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {me} from '../../store/user'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import EditUserForm from '../EditUserForm'

import {Button, Segment, Image, Label, Header} from 'semantic-ui-react'

const SingleUser = props => {
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.allUsers)
  const isAdmin = user.status === 'admin'
  const userId = +props.match.params.userId
  const currentUser = users.find(selectedUser => selectedUser.id === userId)

  if (!user) {
    return <div>No User</div>
  } else {
    return (
      <div>
        {isAdmin ? (
          <Button
            onClick={() => {
              props.history.push(`/update/users/${currentUser.id}`)
            }}
          >
            Edit User
          </Button>
        ) : null}
        <Segment basic>
          <Header as="h1">{currentUser.name}</Header>
          <h3>User Status: {currentUser.status} </h3>
        </Segment>
        <Segment basic padded="very" />
      </div>
    )
  }
}

//export default withRouter(SingleUser)
export default SingleUser
