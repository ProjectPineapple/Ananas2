import React from 'react'
import PropTypes from 'prop-types'
import {useSelector, useDispatch} from 'react-redux'
import {Container, Button, Header, Icon} from 'semantic-ui-react'
import {logout} from '../store'
import {withRouter} from 'react-router'

const Navbar = ({history}) => {
  const user = useSelector(state => state.user)
  const order = useSelector(state => state.viewCart)
  const dispatch = useDispatch()
  const Logout = () => {
    dispatch(logout())
  }
  const totalItemsInCart = order.OrderLineItems
    ? order.OrderLineItems.reduce((acc, lineItem) => acc + lineItem.quantity, 0)
    : 0
  return (
    <div className="navbar">
      <Container onClick={() => history.push('/')}>
        <Header as="h1" color="teal" className="navbar-logo">
          seaBay
        </Header>
      </Container>
      <Button onClick={() => history.push('/cart')}>
        {order.OrderLineItems ? (
          <Icon name="cart" color="black">
            {totalItemsInCart}
          </Icon>
        ) : (
          <Icon name="cart" color="black" />
        )}
      </Button>
      <Button.Group>
        <Button
          onClick={() =>
            user.email ? history.push('/home') : history.push('/login')
          }
        >
          {user.email || 'Login'}
        </Button>
        <Button onClick={() => history.push('/products')}>Browse</Button>
        <Button onClick={Logout}>Logout</Button>
      </Button.Group>
    </div>
  )
}

export default withRouter(Navbar)
