import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Button, Icon} from 'semantic-ui-react'
import {addToCart} from '../store/viewCart.js'

const AddToCartButton = props => {
  const {productToAdd, productInCart} = props
  const {id, stock} = productToAdd
  let inCart = false
  const orderId = useSelector(state => state.viewCart.id)
  const dispatch = useDispatch()
  const handleClickAdd = event => {
    dispatch(addToCart(+event.target.value, orderId))
  }
  if (Object.keys(productInCart).length) inCart = true

  return (
    <div>
      <Button
        icon
        color="teal"
        onClick={handleClickAdd}
        value={id}
        disabled={
          stock <= 0 || inCart ? productInCart.quantity >= stock : false
        }
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
