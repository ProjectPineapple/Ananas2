import React from 'react'
import PropTypes from 'prop-types'
import {useSelector, useDispatch} from 'react-redux'
import {Container, Button, Header, Loader} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {withRouter} from 'react-router'

const Navbar = ({history}) => {
  const user = useSelector(state => state.user)
  const order = useSelector(state => state.viewCart)
  const dispatch = useDispatch()
  const Logout = () => {
    dispatch(logout())
  }
  return (
    <div className="navbar">
      <Container>
        <Header as="h1" color="teal">
          seaBay
        </Header>
      </Container>
      <Button onClick={() => history.push('/cart')}>
        {order.OrderLineItems
          ? `Cart: ${order.OrderLineItems.length} Items`
          : 'Cart: Empty'}
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
    // <div>
    //   <div id="title">seaBay</div>
    //   <nav>
    //     {isLoggedIn ? (
    //       <div className="login-signup">
    //         {/* The navbar will show these links after you log in */}
    //         <Link to="/home">Home</Link>
    //         <a href="#" onClick={handleClick}>
    //           Logout
    //         </a>
    //       </div>
    //     ) : (
    //       <div className="login-signup">
    //         {/* The navbar will show these links before you log in */}
    //         <Link to="/login">Login</Link>
    //         <Link to="/signup">Sign Up</Link>
    //       </div>
    //     )}
    //   </nav>
    //   <hr />
    // </div>
  )
}

export default withRouter(Navbar)
