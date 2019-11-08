import React from 'react'
import {Segment, Item} from 'semantic-ui-react'

const OrderList = function({orders, all}) {
  return orders.length ? (
    <Segment
      onClick={() => {
        // add link or thunk to itemized view of order
        console.log('Order Single Veiw to Come')
      }}
    >
      {orders.map(order => (
        <Item key={order.id}>
          <Item.Header>
            {' '}
            Order #: {order.id} -- {order.OrderLineItems.length} items
          </Item.Header>
          <Item.Meta>
            {all ? (
              <span
                className={
                  order.status === 'cancelled' || order.status === 'in-dispute'
                    ? 'redtext'
                    : 'greentext'
                }
              >
                Status: ${order.status}{' '}
              </span>
            ) : null}
            <span>Subtotal: {order.subtotal}</span>
          </Item.Meta>
        </Item>
      ))}
    </Segment>
  ) : (
    <h1>No Orders</h1>
  )
}
export default OrderList
