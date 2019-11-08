import React from 'react'
import {Segment, Item, Modal, Button, Header, Icon} from 'semantic-ui-react'

const OrderList = function({orders, all}) {
  // singleOrderClick = () => {
  //   // add link or thunk to itemized view of order

  //   console.log('Order Single Veiw to Come')
  // }

  return orders.length ? (
    <Segment>
      {orders.map(order => (
        <Modal
          key={order.id}
          trigger={
            <Item key={order.id}>
              <Item.Header>
                {' '}
                Order #: {order.id} -- {order.OrderLineItems.length} items
              </Item.Header>
              <Item.Meta>
                {all ? (
                  <span
                    className={
                      order.status === 'cancelled' ||
                      order.status === 'in-dispute'
                        ? 'redtext'
                        : 'greentext'
                    }
                  >
                    Status: {order.status}{' '}
                  </span>
                ) : null}
                <span>Subtotal: ${order.subtotal}</span>
              </Item.Meta>
            </Item>
          }
        >
          <Modal.Header>Order # {order.id}</Modal.Header>
          <Modal.Content scrolling>
            <Modal.Description>
              <Header>This order is {order.status}</Header>
              {order.OrderLineItems &&
                order.OrderLineItems.map(OrderLineItem => 'Line Item')}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button primary>
              Proceed <Icon name="chevron right" />
            </Button>
            <Button>Back to Orders</Button>
          </Modal.Actions>
        </Modal>
      ))}
    </Segment>
  ) : (
    <h1>No Orders</h1>
  )
}
export default OrderList
