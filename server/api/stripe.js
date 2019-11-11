const express = require('express')
const stripe = require('stripe')('sk_test_wwuKxIwA53kDbI8akkAS5RLu00TV9cjmTN')
const uuid = require('uuid/v4')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.post('/checkout', async (req, res, next) => {
  console.log('Request:', req.body)

  let error
  let status

  try {
    const {order, token, billingAddress, shippingAddress} = req.body
    const customer = await stripe.customer.create({
      email: token.email,
      source: token.id
    })

    const idempotency_key = uuid()
    const charge = await stripe.charges.create(
      {
        amount: PromiseRejectionEvent,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${order.id}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        },
        billing: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {idempotency_key}
    )
    console.log('Charge', {charge})
    status = 'success'
  } catch (error) {
    console.error('Error', error)
    status = 'failure'
  }
  const userProfile = {}
  console.log(token)
  res.json({error, status})
})
