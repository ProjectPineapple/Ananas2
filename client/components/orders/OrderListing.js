import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Table, Modal, Button, Icon, Divider} from 'semantic-ui-react'
import {withRouter} from 'react-router'
import {centsToPrice} from '../../utilityMethods'
import {fetchUserOrders} from '../../store/userOrders.js'
import {fetchSingleOrder} from '../../store/singleOrder.js'
import {Link} from 'react-router-dom'

const OrderListing = props => {
  const user = useSelector(state => state.user)
  if (!user)
    return (
      <div>
        <h2>How did you get here?</h2>
        <h3 onClick={() => history.back()}>Back</h3>
      </div>
    )
  const isAdmin = user.status === 'admin'
  const orderId = +location.pathname[location.pathname.length - 1]
  const order = useSelector(state => state.singleOrder)
  const lineItems = order.OrderLineItems || []
  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(fetchSingleOrder(orderId))
    },
    [orderId]
  )
  //  useEffect(() => { dispatch(fetchUserOrders(user.id)) }, [user.id])

  if (!isAdmin)
    return (
      <div>
        <h2>Unauthorized</h2>
        <h3 onClick={() => history.back()}>Back</h3>
      </div>
    )
  return (
    <div>
      <h2>Order #{order.id}</h2>
      {/* General Info */}
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell># of Items</Table.HeaderCell>
            <Table.HeaderCell>Submitted</Table.HeaderCell>
            <Table.HeaderCell>Paid</Table.HeaderCell>
            <Table.HeaderCell>Shipped</Table.HeaderCell>
            <Table.HeaderCell>Delivered</Table.HeaderCell>
            <Table.HeaderCell>Completed</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{order.status}</Table.Cell>
            <Table.Cell>{lineItems.length}</Table.Cell>
            <Table.Cell>{order.submittedTime}</Table.Cell>
            <Table.Cell>{order.paymentTime}</Table.Cell>
            <Table.Cell>{order.shipTime}</Table.Cell>
            <Table.Cell>{order.deliveryTime}</Table.Cell>
            <Table.Cell>{order.completedTime}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      {/* Line Items */}
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product ID</Table.HeaderCell>
            <Table.HeaderCell>Product Name</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Price at Purchase</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {lineItems.map(item => (
            <Table.Row key={item.productId}>
              <Table.Cell>{item.productId}</Table.Cell>
              <Table.Cell>{item.product.name}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>{centsToPrice(item.priceAtPurchase)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        {/* Money */}
      </Table>
      <Divider />
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Subtotal</Table.HeaderCell>
            <Table.HeaderCell>Tax</Table.HeaderCell>
            <Table.HeaderCell>Shipping</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{centsToPrice(order.subtotal)}</Table.Cell>
            <Table.Cell>some taxes</Table.Cell>
            <Table.Cell>some shipping amount</Table.Cell>
            <Table.Cell>{centsToPrice(order.total)}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

export default OrderListing
