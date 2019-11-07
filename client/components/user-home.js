import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import {Button, Image, Icon} from 'semantic-ui-react'

const UserHome = props => {
  // let [isClicked, setIsClicked] = useState(false)
  const user = useSelector(state => state.user)
  const isAdminStatus = user.status === 'admin'

  return !isAdminStatus ? (
    <h1>Admin</h1>
  ) : (
    <div>
      {/* Figuring out best UI for positioning */}
      <Button.Group floated="right">
        <Button animated>
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
      <h2>Welcome back, {user.email}</h2>
      <Image src="https://picsum.photos/100/100" circular />
      {/* Prompt customer to browse catalog if cart empty OR make purchase if cart has items */}
      {/* Need case where user has no orders with "in-cart" status */}
      {!user.orders ? (
        <h3>
          Your shopping cart looks empty, but that's okay. You can browse our
          vast catalog of battleships <a href="/products">here.</a>
        </h3>
      ) : (
        <h3>
          You've got some items in your shopping cart. You can keep browsing our
          vast catalog of battleships
          <a href="/products">here</a> or <a href="/cart">go to your cart</a>to
          check out!
        </h3>
      )}
      {/* EDIT PROFILE - BUILD EDIT PROFILE COMPONENT (email, pwd, name, default addresses) */}
      {/* <Button
        type="submit"
        onClick={setIsClicked(state => ({
          isClicked: !state.isClicked
        }))}
      >
        Edit Profile
      </Button> */}
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
