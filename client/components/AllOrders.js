import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchAllOrders} from '../store/allOrders'
import {Segment, Item} from 'semantic-ui-react'

const AllOrders = props => {
  const orders = useSelector(state => state.allOrders)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllOrders(), [])
  })

  return !orders || !orders.length ? (
    <h1>No Orders</h1>
  ) : (
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
  )
}

export default AllOrders
