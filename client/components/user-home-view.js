import React from 'react'
import {useSelector} from 'react-redux'

const UserHomeView = props => {
  const cart = useSelector(state => state.viewCart)

  return (
    <div>
      {cart ? (
        <h3>
          Your shopping cart looks empty, but that's okay. You can browse our
          vast catalog of battleships <a href="/products">here.</a>
        </h3>
      ) : (
        <h3>
          You've got some items in your shopping cart. You can keep browsing our
          vast catalog of battleships
          <a href="/products"> here</a> or <a href="/cart">go to your cart </a>to
          check out!
        </h3>
      )}
    </div>
  )
}

export default UserHomeView
