import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
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
  ViewCart,
  EditOrderForm
} from './components'
import {me} from './store'
import {updateOrder} from './store/singleOrder'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {user, location, order} = this.props
    const isAdmin = user.status === 'admin'
    const isLoggedIn = !!user.id
    console.log(isAdmin)

    return (
      <Switch>
        <Route exact path="/" component={user.id ? UserHome : AllProducts} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/products"
          render={() => <AllProducts key={location.search} />}
        />

        <Route
          exact
          path="/view/product/:productId"
          render={() => (
            <ProductListing key={this.props.match.params.productId} />
          )}
        />
        <Route path="/signup" component={Signup} />
        <Route exact path="/cart" render={() => <ViewCart />} />
        <Route exact path="/cart/checkout" component={checkoutForm} />
        <Route exact path="/home" component={UserHome} />
        {isAdmin && (
          <Switch>
            <Route exact path="/add/products" component={AddProductForm} />
            <Route
              exact
              path="/update/products/:productId"
              component={UpdateProductForm}
            />
            <Route
              exact
              path="/update/orders/:orderId"
              render={() => <EditOrderForm onSubmit={this.props.submit} />}
            />
          </Switch>
        )}
        <Redirect to="/404NotFound" />
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
    },
    submit(order) {
      dispatch(updateOrder(order))
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
