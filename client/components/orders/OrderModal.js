import React, {useState} from 'react'
import {Table, Modal, Button, Icon, Divider} from 'semantic-ui-react'
import {withRouter} from 'react-router'
import {centsToPrice} from '../../utilityMethods'

const OrderModal = ({order}) => {
  const lineItems = order.OrderLineItems
  const [open, setOpen] = useState(false)
  const [dimmer, setDimmer] = useState(true)

  const handleOpen = () => {
    setDimmer(true)
    setOpen(!open)
  }

  const handleClickClose = () => {
    setOpen(!open)
  }

  return (
    <Modal
      key={`m${order.id}`}
      trigger={<Button onClick={handleOpen}>See Details</Button>}
      dimmer={dimmer}
      open={open}
      onClose={handleClickClose}
      closeIcon
    >
      <Modal.Header>
        <div>Order #{order.id}</div>
      </Modal.Header>
      <Modal.Content>
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
              <Table.Cell>some dollars</Table.Cell>
              <Table.Cell>some shipping amount</Table.Cell>
              <Table.Cell>{centsToPrice(order.total)}</Table.Cell>
            </Table.Row>
          </Table.Body>

          {/* Maybe we can include some pagination if the order is long enough -- shelving it for now. <Table.Footer>
	      <Table.Row>
	      <Table.HeaderCell colSpan='3'>
	      <Menu floated='right' pagination>
	      <Menu.Item as='a' icon>
	      <Icon name='chevron left' />
	      </Menu.Item>
	      <Menu.Item as='a'>1</Menu.Item>
	      <Menu.Item as='a'>2</Menu.Item>
	      <Menu.Item as='a'>3</Menu.Item>
	      <Menu.Item as='a'>4</Menu.Item>
	      <Menu.Item as='a' icon>
	      <Icon name='chevron right' />
	      </Menu.Item>
	      </Menu>
	      </Table.HeaderCell>
	      </Table.Row>
	      </Table.Footer> */}
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={() => history.push(`/orders/${order.id}`)}>
          More Options <Icon name="right chevron" />
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default withRouter(OrderModal)
