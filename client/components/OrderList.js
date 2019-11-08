import React from 'react'
import {
  Segment,
  Item,
  Modal,
  Button,
  Header,
  Icon,
  List,
  Divider
} from 'semantic-ui-react'

const OrderList = function({orders, all}) {
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
              <List>
                {order.OrderLineItems &&
                  order.OrderLineItems.map((OrderLineItem, index) => (
                    <List.Item key={index}>
                      <List.Content key="product">
                        {OrderLineItem.product.name} -- qty{' '}
                        {OrderLineItem.quantity}
                      </List.Content>
                      <List.Content floated="right" key="price">
                        ${OrderLineItem.priceAtPurchase}
                      </List.Content>
                    </List.Item>
                  ))}
                <Divider key="Divider" />
                <List.Item key="Subtotal">
                  <List.Content floated="right">
                    Subtotal: {order.subtotal}
                  </List.Content>
                </List.Item>
                <List.Item key="Total">
                  <List.Content floated="right">
                    Total: {order.total}
                  </List.Content>
                </List.Item>
              </List>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button primary>
              Proceed <Icon name="chevron right" />
            </Button>
          </Modal.Actions>
        </Modal>
      ))}
    </Segment>
  ) : (
    <h1>No Orders</h1>
  )
}
export default OrderList
