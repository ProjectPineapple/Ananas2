import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Route, NavLink, matchPath} from 'react-router-dom'
import ViewCart from './ViewCart'
import {Image, Tab, Header, Segment} from 'semantic-ui-react'

import AllOrders from './orders/AllOrders'
import AllReviews from './reviews/AllReviews'
import AllUsers from './users/AllUsers'

import {changeUser} from '../store/user'

const AdminDashboard = props => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  // const [isClickedAdminDash, setIsClickedAdminDash] = useState(false)
  const userId = user.id
  const displayName = user.name
  // const cart = useSelector(state => state.viewCart)
  const {isAdminStatus} = props

  // const cartSize = !cart.products ? 0 : cart.products.length

  const submit = user => {
    // print the form values to the console
    dispatch(changeUser(user))
  }

  // const handleClick = () => {
  //   setIsClickedAdminDash(!isClickedAdminDash)
  // }

  if (!user.id) props.history.push('/')

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

  const defaultActiveIndex = adminPanes.findIndex(pane => {
    return !!matchPath(window.location.pathname, {
      path: pane.menuItem.to,
      exact: true
    })
  })

  return (
    <div className="user-home-tabs">
      <Tab defaultActiveIndex={defaultActiveIndex} panes={adminPanes} />
    </div>
  )
}

export default AdminDashboard
