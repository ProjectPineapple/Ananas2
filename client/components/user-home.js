import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ViewCart from './ViewCart'
import {Image, Tab, Header, Segment} from 'semantic-ui-react'

import UserOrders from './orders/UserOrders'
import AllOrders from './orders/AllOrders'
import AllReviews from './reviews/AllReviews'
import UserReviews from './reviews/UserReviews'

import UserForm from './EditUserForm'
import {changeUser} from '../store/user'
import AllUsers from './users/AllUsers'

const UserHome = props => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const userId = user.id
  const cart = useSelector(state => state.viewCart)
  const isAdminStatus = user.status === 'admin'

  const cartSize = !cart.products ? 0 : cart.products.length

  const submit = user => {
    // print the form values to the console
    dispatch(changeUser(user))
  }

  const panes = [
    {
      menuItem: {
        key: 'cart',
        icon: 'shopping basket',
        content: `Cart ${cartSize}`
      },

      render: () => (
        <Tab.Pane>
          <ViewCart cart={cart} />
        </Tab.Pane>
      )
    },
    {
      menuItem: {key: 'order', icon: 'history', content: 'Orders'},
      render: () => (
        <Tab.Pane>
          <UserOrders />
        </Tab.Pane>
      )
    },
    {
      menuItem: {key: 'editProfile', icon: 'edit', content: 'Edit Profile'},
      render: () => (
        <Tab.Pane>
          Edit Your Profile <UserForm onSubmit={submit} />
        </Tab.Pane>
      )
    },
    {
      menuItem: {key: 'reviews', icon: 'star', content: 'Reviews'},
      render: () => (
        <Tab.Pane>
          Reviews <UserReviews userId={userId} />
        </Tab.Pane>
      )
    }
  ]
  if (isAdminStatus) {
    panes.push(
      {
        menuItem: {key: 'allorders', icon: 'history', content: 'All Orders'},
        render: () => (
          <Tab.Pane>
            <AllOrders />
          </Tab.Pane>
        )
      },
      {
        menuItem: {key: 'allreviews', icon: 'star', content: 'All Reviews'},
        render: () => (
          <Tab.Pane>
            <AllReviews />
          </Tab.Pane>
        )
      }
    )
  }
  if (isAdminStatus) {
    panes.push({
      menuItem: {key: 'allusers', icon: 'user', content: 'All Users'},
      render: () => (
        <Tab.Pane>
          <AllUsers />
        </Tab.Pane>
      )
    })
  }

  return (
    <div>
      <Segment padded="very">
        <Header as="h1">Welcome {user.email || 'guest'}!</Header>
        <Image src="https://picsum.photos/100/100" circular />
      </Segment>
      <br />
      <br />
      <Tab panes={panes} />
    </div>
  )
}

export default UserHome
