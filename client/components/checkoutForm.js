import React from 'react'
import {useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Header, Divider, Segment} from 'semantic-ui-react'
import _ from 'lodash'
import faker from 'faker'
import ViewCart from './ViewCart'
import axios from 'axios'
import {toast} from 'react-toastify'
import StripeCheckout from 'react-stripe-checkout'

toast.configure()

const checkoutForm = props => {
  const order = useSelector(state => state.viewCart)
  const addressDefinitions = faker.definitions.address
  const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
    key: addressDefinitions.state_abbr[index],
    text: state,
    value: addressDefinitions.state_abbr[index]
  }))

  // add some sort of setTimeout to make sure that people arent sitting in checkout on sale items
  async function handleToken(token) {
    const {data} = await axios.post('/api/cart/checkout', {token, order})
    const {status} = data
    console.log('data ', data, 'status ', status)
    if (status === 'paid') {
      //      toast('Success! Check email for details!', {type: 'success'})
      props.history.push(`/${data.confirmationCode}/success`)
    } else {
      toast('Something went wrong, sad beans', {type: 'error'})
    }
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
export default withRouter(checkoutForm)
