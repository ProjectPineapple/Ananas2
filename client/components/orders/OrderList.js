import React from 'react'
import OrderModal from './OrderModal'

const OrderList = props => {
  const {all, orders} = props

  return orders.length ? (
    <div>
      {orders.map(order => (
        <div key={order.id} className="listing-orders">
          <div className="order-name">
            <h3>
              Order #{order.id + ' '} -- {' ' + order.OrderLineItems.length}{' '}
              items
            </h3>
          </div>
          <div className="order-status">
            {all ? (
              <span
                className={
                  order.status === 'cancelled' || order.status === 'in-dispute'
                    ? 'redtext'
                    : 'greentext'
                }
              >
                Status: {order.status}{' '}
              </span>
            ) : null}
          </div>
          <div>
            <OrderModal order={order} />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <h1>No Orders</h1>
  )
}

export default OrderList
