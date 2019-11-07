import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  Form,
  Header,
  Divider,
  Button,
  Dropdown,
  Segment
} from 'semantic-ui-react'
import _ from 'lodash'
import faker from 'faker'
import ViewCart from './view-cart'
import {
  setFirstName,
  setLastName,
  setEmail,
  setBillingAddress,
  setMailingAddress,
  setPaymentMethod,
  resetForm,
  checkoutOrder
} from '../store/checkout'

const checkoutForm = function(props) {
  const dispatch = useDispatch()
  const {
    firstName,
    lastName,
    email,
    billingAddress,
    mailingAddress,
    paymentMethod
  } = useSelector(state => state.checkout)
  const order = useSelector(state => state.viewCart)
  const addressDefinitions = faker.definitions.address
  const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
    key: addressDefinitions.state_abbr[index],
    text: state,
    value: addressDefinitions.state_abbr[index]
  }))

  const handleSubmit = e => {
    e.preventDefault()
    const checkoutData = {
      firstName,
      lastName,
      email,
      billingAddress,
      mailingAddress,
      paymentMethod
    }
    dispatch(checkoutOrder(checkoutData))
    // pass to thunk for checkout

    // check email to match to previous profiles
    // create user profile if none exists
    // assign order to
  }

  return (
    <div>
      <Segment>
        <Header as="h1">Review Your Order</Header>
      </Segment>
      <ViewCart />
      <Divider />
      <Form onSubmit={handleSubmit}>
        <Header as="h3">Add Contact Info</Header>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="First name"
            placeholder="First name"
            value={firstName}
            onChange={e => dispatch(setFirstName(e.target.value))}
          />
          <Form.Input
            fluid
            label="Last name"
            placeholder="Last name"
            value={lastName}
            onChange={e => dispatch(setLastName(e.target.value))}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            width="5"
            fluid
            label="Email"
            placeholder="Email"
            value={email}
            onChange={e => dispatch(setEmail(e.target.value))}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            fluid
            label="Shipping address"
            placeholder="Street address"
            width={10}
            value={mailingAddress}
            onChange={e => dispatch(setMailingAddress(e.target.value))}
          />
          {/* <Form.Input fluid label="City" placeholder="City" width={4} />
          <Dropdown
            placeholder="State"
            search
            selection
            options={stateOptions}
            width={2}
          />
          <Form.Input fluid label="Zip Code" placeholder="Zip" width={3} /> */}
        </Form.Group>
        <Form.Group>
          <Form.Input
            fluid
            label="Billing address"
            placeholder="Street address"
            width={10}
            value={billingAddress}
            onChange={e => dispatch(setBillingAddress(e.target.value))}
          />
          {/* <Form.Input fluid label="City" placeholder="City" width={4} />
          <Dropdown
            placeholder="State"
            search
            selection
            options={stateOptions}
            width={2}
          />
          <Form.Input fluid label="Zip Code" placeholder="Zip" width={3} /> */}
        </Form.Group>
        <Button type="submit">Proceed to Payment</Button>
      </Form>
    </div>
  )
}
export default checkoutForm
