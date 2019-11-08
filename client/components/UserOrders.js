import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUserOrders, resetUserOrders} from '../store/userOrders'
import {Segment, Item} from 'semantic-ui-react'

const UserOrders = () => {
  const orders = useSelector(state => state.userOrders)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserOrders(user.id), [])
    return () => {
      dispatch(resetUserOrders())
    }
  }, [])

  return orders.length ? (
    <Segment>
      {orders.map(order => (
        <Item key={order.id}>
          <Item.Header as="a">
            {' '}
            Order #: {order.id} User: {user.email}
          </Item.Header>
          <Item.Meta>
            <span>Status: {order.status}</span>{' '}
            <span>Subtotal: {order.subtotal}</span>
          </Item.Meta>
        </Item>
      ))}
    </Segment>
  ) : (
    <h1>No Orders</h1>
  )
}

export default UserOrders
