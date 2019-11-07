import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import ViewCart from './view-cart'
import UserHomeView from './user-home-view'
import {Button, Image, Icon} from 'semantic-ui-react'

const UserHome = props => {
  let [isClickedShowCart, setIsClickedShowCart] = useState(false)
  const user = useSelector(state => state.user)
  const cart = useSelector(state => state.viewCart)
  const isAdminStatus = user.status === 'admin'

  function handleClickShowCart() {
    setIsClickedShowCart(!isClickedShowCart)
  }

  return !isAdminStatus ? (
    <h1>Admin</h1>
  ) : (
    <div>
      <Button.Group floated="right">
        <Button animated onClick={handleClickShowCart}>
          <Button.Content visible>
            <Icon name="shopping basket" />
          </Button.Content>
          <Button.Content hidden>Cart</Button.Content>
        </Button>
        <Button animated>
          <Button.Content visible>
            <Icon name="history" />
          </Button.Content>
          <Button.Content hidden> Orders</Button.Content>
        </Button>
        <Button animated>
          <Button.Content visible>
            <Icon name="edit" />
          </Button.Content>
          <Button.Content hidden> Edit Profile</Button.Content>
        </Button>
      </Button.Group>
      <h2>Welcome back, {user.email}!</h2>
      <Image src="https://picsum.photos/100/100" circular />
      <br />
      <br />
      {isClickedShowCart ? (
        <ViewCart cart={cart} />
      ) : (
        <UserHomeView user={user} cart={cart} />
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     email: state.user.email
//   }
// }

// export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

export default UserHome
