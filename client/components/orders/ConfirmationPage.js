import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {withRouter} from 'react-router'
import {fetchSingleOrder} from '../../store/singleOrder.js'
import {fetchUserOrders} from '../../store/userOrders.js'
//import UserHome from '../../components/user-home.js'

const ConfirmationPage = props => {
  const user = useSelector(state => state.user)
  const userOrders = useSelector(state => state.userOrders)
  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(fetchUserOrders(user.id))
    },
    [user.id]
  )

  console.log(userOrders)
  if (!user)
    return (
      <div>
        <h2>Unauthorized</h2>
        <h3 onClick={() => history.back()}>Back</h3>
      </div>
    )

  return (
    <div>
      <h2>Success! Your order has been placed.</h2>
      <h3>
        Your order confirmation number is ON THE ORDER INSTANCE. An email will
        be sent to {user.email} shortly with your order info.
      </h3>
    </div>
  )
}

export default withRouter(ConfirmationPage)
