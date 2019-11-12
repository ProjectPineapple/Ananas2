import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {useSelector, useDispatch} from 'react-redux'
import {changeAUser} from '../store/addUser'
import {withRouter} from 'react-router'

let UserForm = props => {
  const {handleSubmit} = props
  const user = useSelector(state => state.user)
  const isAdmin = user.status === 'admin'
  const dispatch = useDispatch()
  const {status, password} = useSelector(state => state.addUser)

  const combinedHandleSubmit = e => {
    e.preventDefault()
    dispatch(handleSubmit)
    const userId = +props.match.params.userId
    const userData = {
      status,
      password
    }
    dispatch(changeAUser(userData, userId))
  }

  return (
    <form onSubmit={combinedHandleSubmit}>
      {isAdmin ? (
        <div>
          <label htmlFor="status">User Status</label>
          <Field name="status" component="select">
            <option />
            <option value="admin">Admin</option>
            <option value="auth">User</option>
          </Field>
        </div>
      ) : null}
      <div>
        <label htmlFor="password">Password</label>
        <Field name="password" component="input" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

UserForm = withRouter(
  reduxForm({
    form: 'editUser'
  })(UserForm)
)

export default UserForm
