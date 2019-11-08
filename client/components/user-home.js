import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'

import ViewCart from './ViewCart'

import {Button, Image, Icon, Label, Menu, Tab} from 'semantic-ui-react'
import UserOrders from './UserOrders'

const UserHome = props => {
  const user = useSelector(state => state.user)
  const cart = useSelector(state => state.viewCart)
  const isAdminStatus = user.status === 'admin'

  const panes = [
    {
      menuItem: {key: 'cart', icon: 'shopping basket', content: 'Cart'},
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
      render: () => <Tab.Pane>Edit Your Profile</Tab.Pane>
    }
  ]

  return (
    <div>
      <div>
        <h2>Welcome {user.email || 'guest'}!</h2>
        <Image src="https://picsum.photos/100/100" circular />
      </div>
      <br />
      <br />
      <Tab panes={panes} />
    </div>
  )
}

export default UserHome
