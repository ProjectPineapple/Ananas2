import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Route, NavLink, matchPath} from 'react-router-dom'
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
  const displayName = user.name
  const cart = useSelector(state => state.viewCart)
  const isAdminStatus = user.status === 'admin'

  const cartSize = !cart.products ? 0 : cart.products.length

  const submit = user => {
    // print the form values to the console
    dispatch(changeUser(user))
  }

  if (!user.id) props.history.push('/')

  const panes = [
    {
      menuItem: {
        as: NavLink,
        to: '/home/my-cart',
        exact: true,
        key: 'cart',
        icon: 'shopping basket',
        content: `Cart ${cartSize}`
      },
      render: () => (
        <Route exact path="/home/my-cart">
          <Tab.Pane>
            <ViewCart cart={cart} />
          </Tab.Pane>
        </Route>
      )
    },
    {
      menuItem: {
        as: NavLink,
        to: `/home/my-orders`,
        exact: true,
        key: 'order',
        icon: 'history',
        content: 'Orders'
      },
      render: () => (
        <Route exact path="/home">
          <Tab.Pane>
            <UserOrders />
          </Tab.Pane>
        </Route>
      )
    },
    {
      menuItem: {
        as: NavLink,
        to: '/home/my-profile',
        exact: true,
        key: 'editProfile',
        icon: 'edit',
        content: 'Edit Profile'
      },
      render: () => (
        <Route exact path="/my-profile">
          <Tab.Pane>
            Edit Your Profile <UserForm onSubmit={submit} />
          </Tab.Pane>
        </Route>
      )
    },
    {
      menuItem: {
        as: NavLink,
        to: '/home/my-reviews',
        exact: true,
        key: 'reviews',
        icon: 'star',
        content: 'Reviews'
      },
      render: () => (
        <Route exact path="/my-reviews">
          <Tab.Pane>
            Reviews <UserReviews userId={userId} displayName={displayName} />
          </Tab.Pane>
        </Route>
      )
    }
  ]
  const adminPanes = [
    {
      menuItem: {
        as: NavLink,
        to: '/home/all-orders',
        exact: true,
        key: 'allorders',
        icon: 'history',
        content: 'All Orders'
      },
      render: () => (
        <Route exact path="/home/all-orders">
          <Tab.Pane>
            <AllOrders />
          </Tab.Pane>
        </Route>
      )
    },
    {
      menuItem: {
        as: NavLink,
        to: '/home/all-reviews',
        exact: true,
        key: 'allreviews',
        icon: 'star',
        content: 'All Reviews'
      },
      render: () => (
        <Route exact path="/home/all-reviews">
          <Tab.Pane>
            <AllReviews />
          </Tab.Pane>
        </Route>
      )
    },
    {
      menuItem: {
        as: NavLink,
        to: '/home/all-users',
        exact: true,
        key: 'allusers',
        icon: 'user',
        content: 'All Users'
      },
      render: () => (
        <Route exact path="/home/all-users">
          <Tab.Pane>
            <AllUsers />
          </Tab.Pane>
        </Route>
      )
    }
  ]

  const defaultActiveIndex = panes.findIndex(pane => {
    return !!matchPath(window.location.pathname, {
      path: pane.menuItem.to,
      exact: true
    })
  })
  const adminDefaultActiveIndex = adminPanes.findIndex(pane => {
    return !!matchPath(window.location.pathname, {
      path: pane.menuItem.to,
      exact: true
    })
  })
  return (
    <div>
      <Segment padded="very">
        <Header as="h2">
          <Image circular src="https://picsum.photos/100/100" />
          Welcome, {displayName || 'guest'}!
        </Header>
      </Segment>
      <br />
      <br />
      <div className="user-home-tabs">
        <Tab defaultActiveIndex={defaultActiveIndex} panes={panes} />
        {isAdminStatus && (
          <Tab
            defaultActiveIndex={adminDefaultActiveIndex}
            panes={adminPanes}
          />
        )}
      </div>
    </div>
  )
}

export default UserHome
