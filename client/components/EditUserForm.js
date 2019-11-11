import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {useSelector} from 'react-redux'

let UserForm = props => {
  const {handleSubmit} = props
  const user = useSelector(state => state.user)
  const isAdmin = user.status === 'admin'

  return (
    <form onSubmit={handleSubmit}>
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

UserForm = reduxForm({
  form: 'editUser'
})(UserForm)

export default UserForm
