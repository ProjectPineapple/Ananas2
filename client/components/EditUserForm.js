import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {useSelector} from 'react-redux'

let UserForm = props => {
  const {handleSubmit} = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <Field name="name" component="input" type="text" />
      </div>
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
