import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router'

import {Button, Icon} from 'semantic-ui-react'
import {addToCart} from '../store/viewCart.js'

const AddToCartButton = props => {
  const user = useSelector(state => state.user)
  const orderId = useSelector(state => state.viewCart.id)
  const lineItems = useSelector(state => state.viewCart.OrderLineItems)

  const dispatch = useDispatch()
  const handleClickAdd = event => {
    dispatch(addToCart(+event.target.value, orderId))
  }

  const {productToAdd} = props
  const {id, stock} = productToAdd

  return (
    <div>
      <Button
        icon
        color="teal"
        onClick={handleClickAdd}
        value={id}
        disabled={stock <= 0}
      >
        <Icon name="cart plus" /> Add to Cart
      </Button>
      {stock ? (
        stock <= 5 ? (
          <i style={{color: 'orangered'}}>Only a few left!</i>
        ) : (
          ' '
        )
      ) : (
        <i style={{color: 'red'}}>Out of stock</i>
      )}
    </div>
  )
}

export default AddToCartButton
