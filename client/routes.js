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
  OrderListing,
  ConfirmationPage,
  EditOrderForm,
  SingleUser,
  EditUserForm,
  NotFound,
  CustomerService,
  AllOrders
} from './components'
import {me} from './store'
import {updateOrder} from './store/singleOrder'
import {changeUser} from './store/user'

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
    return (
      <Switch>
        <Route exact path="/" component={user.id ? UserHome : AllProducts} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/home" component={UserHome} />

        <Route exact path="/view/user/:userId" component={SingleUser} />

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
        <Route
          exact
          path="/orders/:orderId"
          render={() => <OrderListing key={this.props.match.params.orderId} />}
        />

        <Route exact path="/cart" render={() => <ViewCart />} />
        <Route exact path="/cart/checkout" component={checkoutForm} />
        <Route
          exact
          path="/:confcode/success"
          render={props => <ConfirmationPage {...props} />}
        />
        <Route exact path="/success" render={() => <ConfirmationPage />} />
        <Route exact path="/customerservice" component={CustomerService} />
        <Route exact path="/NotFound" component={NotFound} />
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
            <Route
              exact
              path="/update/users/:userId"
              render={() => <EditUserForm onSubmit={this.props.submitUser} />}
            />
            <Route exact path="/NotFound" component={NotFound} />
          </Switch>
        )}
        <Redirect to="/NotFound" />
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
    },
    submitUser(user) {
      dispatch(changeUser(user))
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
