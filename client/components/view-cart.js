import React from 'react'
import {fetchCart} from '../store/viewCart.js'
import {connect} from 'react-redux'

class ViewCart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    return (
      <div className="view-cart-container">
        <div className="product-info-col">
          <div className="product-image">hi</div>
          <div className="product-name" />
        </div>
        <div className="product-order-info-col">
          <div className="product-qty" />
          {/* edit quantity / delete */}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart())
})

export default connect(null, mapDispatchToProps)(ViewCart)
