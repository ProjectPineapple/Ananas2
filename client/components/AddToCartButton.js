import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Button, Icon} from 'semantic-ui-react'
import {addToCart} from '../store/viewCart.js'

const AddToCartButton = props => {
  const {productToAdd} = props
  const productInCart = props.productInCart || {}
  const {id, stock} = productToAdd
  let inCart = false
  const orderId = useSelector(state => state.viewCart.id)
  const dispatch = useDispatch()
  const handleClickAdd = event => {
    dispatch(addToCart(+event.target.value, orderId))
  }
  if (Object.keys(productInCart).length) inCart = true

  return (
    <div className="add-to-cart">
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
      <div className="cart-text">
        {stock ? (
          stock <= 5 ? (
            <div>
              <i style={{color: 'orangered'}}>Only a few left!</i>
            </div>
          ) : (
            <div />
          )
        ) : (
          <div>
            <i style={{color: 'red'}}>Out of stock</i>
          </div>
        )}
        {inCart ? (
          <div>
            <i style={{color: 'green'}}>
              {productInCart.quantity + ' '} in cart
            </i>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

export default AddToCartButton
