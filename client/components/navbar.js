import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useSelector, useDispatch} from 'react-redux'
import {Container, Button, Header, Icon} from 'semantic-ui-react'
import {logout} from '../store'
// import {fetchCart} from '../store/viewCart.js'
import {withRouter} from 'react-router'

const Navbar = ({history}) => {
  const user = useSelector(state => state.user)
  const order = useSelector(state => state.viewCart)
  const dispatch = useDispatch()
  const Logout = () => {
    dispatch(logout())
  }
  const totalItemsInCart =
    order && order.OrderLineItems
      ? order.OrderLineItems.reduce(
          (acc, lineItem) => acc + lineItem.quantity,
          0
        )
      : 0
  return (
    <div className="navbar">
      <Container onClick={() => history.push('/')}>
        <Header as="h1" color="teal" className="navbar-logo">
          seaBay
        </Header>
      </Container>
      <Button
        onClick={() => history.push('/cart')}
        labelPosition="left"
        icon="cart"
        content={totalItemsInCart}
      />
      <Button
        onClick={() =>
          user.email ? history.push('/home') : history.push('/login')
        }
      >
        {user.email || 'Login'}
      </Button>
      <Button onClick={() => history.push('/products')}>Browse</Button>
      {user.email ? <Button onClick={Logout}>Logout</Button> : <span />}
    </div>
  )
}

//export default withRouter(Navbar)
export default Navbar
