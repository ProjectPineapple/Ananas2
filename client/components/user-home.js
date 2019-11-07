import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import ViewCart from './ViewCart'
import UserHomeView from './user-home-view'
import {Button, Image, Icon, Label, Menu, Tab} from 'semantic-ui-react'

const UserHome = props => {
  // let [isClickedShowCart, setIsClickedShowCart] = useState(false)
  // let [isClickedShowOrder, setIsClickedShowOrder] = useState(false)
  // let [isClickedEditProfile, setIsClickedEditProfile] = useState(false)
  const user = useSelector(state => state.user)
  const cart = useSelector(state => state.viewCart)
  const isAdminStatus = user.status === 'admin'

  // function handleClickShowCart() {
  //   setIsClickedShowCart(!isClickedShowCart)
  //   if (isClickedShowOrder) setIsClickedEditProfile(!isClickedShowOrder)
  //   if (isClickedEditProfile) setIsClickedEditProfile(!isClickedEditProfile)
  // }

  // function handleClickShowOrder() {
  //   setIsClickedShowOrder(!isClickedShowOrder)
  //   if (isClickedShowCart) setIsClickedEditProfile(!isClickedShowCart)
  //   if (isClickedEditProfile) setIsClickedEditProfile(!isClickedEditProfile)
  // }

  // function handleClickEditProfile() {
  //   setIsClickedEditProfile(!isClickedEditProfile)
  //   if (isClickedShowCart) setIsClickedEditProfile(!isClickedShowCart)
  //   if (isClickedShowOrder) setIsClickedEditProfile(!isClickedShowOrder)
  // }

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
        <UserHomeView cart={cart} />
      </div>
      <br />
      <br />
      <Tab panes={panes} />
    </div>
  )
}

export default UserHome
