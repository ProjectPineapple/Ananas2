import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'

import ViewCart from './ViewCart'

import {Button, Image, Icon, Label, Menu, Tab} from 'semantic-ui-react'

const UserHome = props => {
  const user = useSelector(state => state.user)
  const cart = useSelector(state => state.viewCart)
  const isAdminStatus = user.status === 'admin'

  const cartSize = !cart.products ? 0 : cart.products.length

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
      menuItem: {key: 'order', icon: 'history', content: `Orders`},
      render: () => <Tab.Pane>Your Orders!</Tab.Pane>
    },
    {
      menuItem: {key: 'editProfile', icon: 'edit', content: 'Edit Profile'},
      render: () => <Tab.Pane>Edit Your Profile</Tab.Pane>
    }
  ]

  return !isAdminStatus ? (
    <h1>Admin</h1>
  ) : (
    <div>
      <div>
        <h2>Welcome back, {user.email}!</h2>
        <Image src="https://picsum.photos/100/100" circular />
      </div>
      <br />
      <br />
      <Tab panes={panes} />
    </div>
  )
}

export default UserHome
