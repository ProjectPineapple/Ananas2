import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {withRouter} from 'react-router'
import {
  Button,
  Segment,
  Image,
  Header,
  Grid,
  Divider,
  Form
} from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = ({name, displayName, handleSubmit, error, history}) => {
  return (
    <div>
      <Divider hidden />
      <Divider hidden />
      <Divider hidden />
      <Grid column={1} centered>
        <Segment compact textAlign="center" padded="very" color="teal" raised>
          <Header color="teal" as="h2">
            Welcome to seaBay!
          </Header>
          <br />
          <Image
            size="small"
            centered
            src="https://cdn-images.threadless.com/threadless-media/artist_shops/shops/mblaidd/products/629906/shirt-1529419075-dd6fabe6fd9dfc47c97309cb57878b37.png?v=3&d=eyJvbmx5X21ldGEiOiBmYWxzZSwgImZvcmNlIjogZmFsc2UsICJvcHMiOiBbWyJ0cmltIiwgW2ZhbHNlLCBmYWxzZV0sIHt9XSwgWyJyZXNpemUiLCBbXSwgeyJ3aWR0aCI6IDk5Ni4wLCAiYWxsb3dfdXAiOiBmYWxzZSwgImhlaWdodCI6IDk5Ni4wfV0sIFsiY2FudmFzX2NlbnRlcmVkIiwgWzEyMDAsIDEyMDBdLCB7ImJhY2tncm91bmQiOiAiZmZmZmZmIn1dLCBbInJlc2l6ZSIsIFs4MDBdLCB7fV0sIFsiY2FudmFzX2NlbnRlcmVkIiwgWzgwMCwgODAwLCAiI2ZmZmZmZiJdLCB7fV0sIFsiZW5jb2RlIiwgWyJqcGciLCA4NV0sIHt9XV19"
          />
          <br />
          <Form onSubmit={handleSubmit} name={name}>
            <Form.Field>
              <label htmlFor="email">Email Address</label>
              <input placeholder="E-mail address" type="email" name="email" />
            </Form.Field>
            <br />
            <Form.Field>
              <label htmlFor="password">Password</label>
              <input placeholder="Password" type="password" name="password" />
            </Form.Field>
            <Divider hidden />
            <br />
            <Button basic color="teal" type="submit">
              {displayName}
            </Button>
            {displayName === 'Login' ? (
              <Button
                basic
                color="teal"
                onClick={() => history.push('/signup')}
              >
                Go to Signup
              </Button>
            ) : null}
            <br />
            {error && error.response && <div> {error.response.data} </div>}
          </Form>
          <br />
          <a href="/auth/google">{displayName} with Google</a>
        </Segment>
      </Grid>
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
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

/*export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm))
   export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm))*/

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
