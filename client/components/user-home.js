import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {withRouter} from 'react-router'
import {Route, NavLink, matchPath} from 'react-router-dom'
import ViewCart from './ViewCart'
import {Button, Image, Tab, Header, Segment} from 'semantic-ui-react'

import UserOrders from './orders/UserOrders'
import UserReviews from './reviews/UserReviews'
import UserForm from './EditUserForm'
import AdminDashboard from './admin-dashboard'

import {changeUser} from '../store/user'
import AllUsers from './users/AllUsers'

const UserHome = props => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const userId = user.id
  const displayName = user.name
  const cart = useSelector(state => state.viewCart)
  //  const allOrders = useSelector(state => state.allOrders)
  const isAdminStatus = user.status === 'admin'
  const [isClickedAdminDash, setIsClickedAdminDash] = useState(false)

  const cartSize = !cart.products ? 0 : cart.products.length

  const handleClick = () => {
    setIsClickedAdminDash(!isClickedAdminDash)
  }

  const submit = user => {
    // print the form values to the console
    dispatch(changeUser(user))
  }

  //  useEffect(() => { dispatch(fetchAllOrders()) }, [userId])

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
        <Route exact path="/home/my-orders">
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
  const activeIndex = panes.findIndex(pane => {
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
        {isAdminStatus ? (
          <Button
            color="teal"
            floated="right"
            type="submit"
            onClick={handleClick}
            color={isClickedAdminDash ? 'teal' : 'yellow'}
          >
            {isClickedAdminDash ? 'Back to Home Page' : 'Open Admin Dashboard'}
          </Button>
        ) : null}
      </Segment>
      <br />
      {isAdminStatus && isClickedAdminDash ? (
        <AdminDashboard isAdminStatus={isAdminStatus} />
      ) : (
        <div className="user-home-tabs">
          <Tab defaultActiveIndex={activeIndex} panes={panes} />
        </div>
      )}
    </div>
  )
}

export default withRouter(UserHome)
