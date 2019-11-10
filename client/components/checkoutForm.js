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
import ViewCart from './ViewCart'
import axios from 'axios'
import {toast} from 'react-toastify'
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
import StripeCheckout from 'react-stripe-checkout'

toast.configure()

const checkoutForm = function(props) {
  const order = useSelector(state => state.viewCart)
  const dispatch = useDispatch()
  const {
    firstName,
    lastName,
    email,
    billingAddress,
    mailingAddress,
    paymentMethod
  } = useSelector(state => state.checkout)
  const addressDefinitions = faker.definitions.address
  const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
    key: addressDefinitions.state_abbr[index],
    text: state,
    value: addressDefinitions.state_abbr[index]
  }))

  async function handleToken(token) {
    const response = await axios.post('/api/cart/checkout', {token, order})
    const {status} = data
    console.log('In HandleToken', data)
    if (status === 'success') {
      toast('Success! Check email for details!', {type: 'success'})
    } else {
      toast('Something went wrong, sad beans', {type: 'error'})
    }
  }

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
      <StripeCheckout
        stripeKey="pk_test_0PmCoNYh2JkqkxmAX3FUAOPD00TQAUBVNb"
        token={handleToken}
        billingAddress={true}
        shippingAddress={true}
        state={true}
        amount={order.total}
        orderId={order.id}
      />
    </div>
  )
}
export default checkoutForm
