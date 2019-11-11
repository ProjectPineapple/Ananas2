import React from 'react'
import {Pagination, Icon} from 'semantic-ui-react'
import OrderModal from './OrderModal'
import {parse, stringify} from 'query-string'

const OrderList = props => {
  const {all, orders} = props

  const handlePageChange = (event, data) => {
    console.log('hi')
  }

  return orders.length ? (
    <div>
      <Pagination
        defaultActivePage={1}
        prevItem={{content: <Icon name="angle left" />, icon: true}}
        nextItem={{content: <Icon name="angle right" />, icon: true}}
        totalPages={Math.ceil(orders.length / 10)}
        onPageChange={handlePageChange}
      />
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
