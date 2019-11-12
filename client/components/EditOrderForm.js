import React from 'react'
import {Field, reduxForm, formValueSelector} from 'redux-form'
import {connect} from 'react-redux'

let OrderForm = props => {
  const {handleSubmit} = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="status">Status</label>
        <div>
          <Field name="status" component="select">
            <option />
            <option value="in-cart">In-Cart</option>
            <option value="payment-in-progress">Payment-In-Progress</option>
            <option value="paid">Paid</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="in-dispute">In-Dispute</option>
            <option value="completed">Completed</option>
          </Field>
        </div>
      </div>
      <div>
        <label htmlFor="subtotal">Subtotal</label>
        <div>
          <Field name="subtotal" component="input" type="number" />
        </div>
      </div>
      <br />
      <div>
        <h2>Address</h2>
        <label htmlFor="address1">Address Line 1</label>
        <div>
          <Field name="address1" component="input" type="text" />
        </div>
        <label htmlFor="address2">Address Line 2</label>
        <div>
          <Field name="address2" component="input" type="text" />
        </div>
        <label htmlFor="city">City</label>
        <div>
          <Field name="city" component="input" type="text" />
        </div>
        <label htmlFor="state">State/Province/Region</label>
        <div>
          <Field name="state" component="input" type="text" />
        </div>{' '}
        <label htmlFor="zip">Zip/Postal Code</label>
        <div>
          <Field name="zip" component="input" type="text" />
        </div>
        <label htmlFor="country">Country</label>
        <div>
          <Field name="country" component="input" type="text" />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

OrderForm = reduxForm({
  form: 'editOrder'
})(OrderForm)

const selector = formValueSelector('editOrder')
console.log(selector)
OrderForm = connect(state => {
  const statusValue = selector(state, 'status')
  const subtotalValue = selector(state, 'subtotal')
  const address1Value = selector(state, 'address1')
  const address2Value = selector(state, 'address2')
  const cityValue = selector(state, 'city')
  const stateValue = selector(state, 'state')
  const zipValue = selector(state, 'zip')
  const countryValue = selector(state, 'country')
  return {
    status: statusValue,
    subtotal: subtotalValue * 100,
    address: `${address1Value || ''} ${address2Value || ''} ${cityValue ||
      ''} ${stateValue || ''} ${zipValue || ''} ${countryValue || ''}`
  }
})(OrderForm)

export default OrderForm
