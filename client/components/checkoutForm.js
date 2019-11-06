import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Form, Header, Divider} from 'semantic-ui-react'
import _ from 'lodash'

dummyOrder = {}

const checkoutForm = function(props) {
  //lots of functions to go here
  const dispatch = useDispatch()
  const {email, billingAddress, mailingAddress, paymentMethod} = useSelector(
    state => state.checkout
  )

  const addressDefinitions = faker.definitions.address
  const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
    key: addressDefinitions.state_abbr[index],
    text: state,
    value: addressDefinitions.state_abbr[index]
  }))

  return (
    <div>
      <Header as="h3">Review Your Order</Header>
      {/* in this area you would see Order data and a total*/}
      <Divider />
      <Divider />
      <Header as="h3">Add Contact Info</Header>
      <Form.Group>
        <Form.Input fluid label="First name" placeholder="First name" />
        <Form.Input fluid label="Last name" placeholder="Last name" />
      </Form.Group>
      <Divider />
      <Form.Group>
        <Form.Input
          fluid
          label="Shipping address"
          placeholder="Street address"
          width={10}
        />
        <Form.Input fluid label="City" placeholder="City" width={4} />
        <Dropdown
          placeholder="State"
          search
          selection
          options={stateOptions}
          width={2}
        />
        <Form.Input fluid label="Zip Code" placeholder="Zip" width={3} />
      </Form.Group>
      <Form.Group>
        <Form.Input
          fluid
          label="Billing address"
          placeholder="Street address"
          width={10}
        />
        <Form.Input fluid label="City" placeholder="City" width={4} />
        <Dropdown
          placeholder="State"
          search
          selection
          options={stateOptions}
          width={2}
        />
        <Form.Input fluid label="Zip Code" placeholder="Zip" width={3} />
      </Form.Group>
    </div>
  )
}
export default checkoutForm
