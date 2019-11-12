import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {withRouter} from 'react-router'
import {fetchOrderByUser} from '../../store/singleOrder.js'
import {fetchUserOrders} from '../../store/userOrders.js'
//import UserHome from '../../components/user-home.js'

const ConfirmationPage = props => {
  const {confcode} = +props.match.params
  const user = useSelector(state => state.user)
  /* const userOrders = useSelector(state => state.userOrders)
   * const orderIds = userOrders.map(order => order.id)
   * // temporary; ideally order/order id comes in as props
   * const relevantOrderId = Math.max(...orderIds) || 0
   * //  const relevantOrder = useSelector(state => state.singleOrder)
   * const relevantOrder = userOrders.find(order => order.id === relevantOrderId)
   * const dispatch = useDispatch()

   * useEffect(
   *   () => {
   *     dispatch(fetchUserOrders(user.id))
   *   },
   *   [user.id]
   * )
   * useEffect(
   *   () => {
   *     dispatch(fetchOrderByUser(relevantOrderId, user.id))
   *   },
   *   [relevantOrderId]
   * )

   * console.log(userOrders) */
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
        Your order confirmation number is {confcode}. An email will be sent to{' '}
        {user.email} with your order info shortly.
      </h3>
    </div>
  )
}

export default withRouter(ConfirmationPage)

// todo: conf code to null on 'completed' status
