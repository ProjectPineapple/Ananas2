import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {NavLink, withRouter} from 'react-router-dom'
import {fetchUserOrders} from '../../store/userOrders.js'

const ConfirmationPage = props => {
  const {confcode} = props.match.params
  const user = useSelector(state => state.user)
  const userOrders = useSelector(state => state.userOrders)
  const dispatch = useDispatch()
  useEffect(
    () => {
      if (user.id) dispatch(fetchUserOrders(user.id))
    },
    [user.id]
  )
  console.log('user orders ', userOrders)
  const matchingOrder =
    userOrders.find(order => order.confirmationCode === confcode) || ''

  console.log(matchingOrder)

  if (!matchingOrder)
    return (
      <div>
        <h2>Unauthorized</h2>
        <NavLink to="/">Back</NavLink>
      </div>
    )

  return (
    <div>
      <h2>Success! Your order has been placed.</h2>
      <h3>
        Your order confirmation number is {confcode}. An email will be sent to{' '}
        {user.email} with your order info shortly.
      </h3>
    </div>
  )
}

export default withRouter(ConfirmationPage)

// apply condition to useEffect in AddToCartButton (<<i think)
