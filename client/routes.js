import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  ProductListing,
  UpdateProductForm,
  AddProductForm,
  checkoutForm,
  ViewCart
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {user} = this.props
    const isAdmin = user.status === 'admin'
    const isLoggedIn = !!user.id
    console.log(isLoggedIn)

    return (
      <Switch>
        {isAdmin ? (
          <Switch>
            <Route exact path="/add/products" component={AddProductForm} />
            <Route
              path="/update/products/:productId"
              component={UpdateProductForm}
            />
          </Switch>
        ) : null}
        <Route path="/login" component={Login} />
        <Route exact path="/products" component={AllProducts} />
        <Route
          exact
          path="/products/:productId"
          render={() => (
            <ProductListing key={this.props.match.params.productId} />
          )}
        />
        <Route path="/signup" component={Signup} />
        <Route exact path="/cart" render={() => <ViewCart />} />
        <Route exact path="/cart/checkout" component={checkoutForm} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
          </Switch>
        )}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.status === 'admin',
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
