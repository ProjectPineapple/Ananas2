import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {withRouter} from 'react-router'
import {Input, Button} from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = ({name, displayName, handleSubmit, error, history}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <Input label="Email" name="email" type="text" />
        </div>
        <div>
          <Input label="Password" name="password" type="password" />
        </div>
        <div>
          <Button type="submit">{displayName}</Button>
        </div>
        {displayName === 'Login' ? (
          <div>
            <Button onClick={() => history.push('/signup')}>
              Go to Signup
            </Button>
          </div>
        ) : null}
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      console.log(email)
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm))
export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm))

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
