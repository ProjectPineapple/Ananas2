import React from 'react'
import {Field, reduxForm, formValueSelector, formValues} from 'redux-form'
import {connect, useSelector, useDispatch} from 'react-redux'
import {changeOrder} from '../store/singleOrder'
import {withRouter} from 'react-router'

let OrderForm = props => {
  const {handleSubmit} = props
  // const {status, subtotal, address} = useSelector(state => state.singleOrder)
  const dispatch = useDispatch()
  let status
  if (props.status) {
    status = props.status
  }
  let subtotal
  if (props.subtotal) {
    subtotal = props.subtotal
  }
  let address
  if (props.address) {
    address = props.address
  }

  const combinedHandleSubmit = e => {
    e.preventDefault()
    dispatch(handleSubmit)
    const orderId = Number(props.match.params.orderId)
    const orderData = {
      status,
      subtotal,
      address
    }
    dispatch(changeOrder(orderData, orderId))
  }

  return (
    <form onSubmit={combinedHandleSubmit}>
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
OrderForm = connect(state => {
  const status = selector(state, 'status')
  const subtotal = selector(state, 'subtotal')
  const address1 = selector(state, 'address1')
  const address2 = selector(state, 'address2')
  const city = selector(state, 'city')
  const stateValue = selector(state, 'state')
  const zip = selector(state, 'zip')
  const country = selector(state, 'country')
  return {
    status,
    subtotal,
    address: `${address1} ${address2} ${city} ${stateValue} ${zip} ${country}`
  }
})(OrderForm)

//export default withRouter(OrderForm)
export default OrderForm
