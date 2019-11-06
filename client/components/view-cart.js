import React from 'react'
import {fetchCart} from '../store/viewCart.js'
import {connect} from 'react-redux'

class ViewCart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    const {viewCart} = this.props
    console.log('the cart', viewCart)
    return (
      <div className="view-cart-container">
        <div className="product-info-col">
          <div className="product-image">
            here's the image of the first product
          </div>
          <div className="product-name">
            here's the name of the first product
          </div>
        </div>
        <div className="product-order-info-col">
          <div className="product-qty" />
          Quantity:
          {/* edit quantity / delete */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({viewCart}) => ({viewCart})

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart)
