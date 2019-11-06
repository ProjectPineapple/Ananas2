import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ProductListing} from './productListing'

class allProducts extends Component {
  //CHECK ASSUMPTION: FETCHPRODUCTS IN MAIN'S COMPONENT DID MOUNT?
  constructor(props) {
    super(props)
    this.state = {
      isClicked: false,
      isAdmin: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  //POTENTIAL VIEW PRODUCT BUTTON
  handleClick() {
    this.setState(state => ({isClicked: !state.isClicked}))
  }

  render() {
    const products = this.props.products
    const btnClicked = this.state.isClicked
    const isAdmin = this.state.isAdmin
    //CREATE ERROR PAGE INSTEAD IF THIS HAPPENS?
    if (products === undefined || !products.length) {
      return <h1>No Products</h1>
    } else {
      return (
        <div>
          <p>All Categories</p>
          {products.map(product => (
            <ProductListing key={product.id} product={products} />
          ))}

          {/* INCLUDE ADMIN BUTTONS HERE (TERNARY)? */}
          <button
            className={isAdmin ? 'addProduct' : 'hidden'}
            type="submit"
            onClick={this.handleClick}
          >
            Add Product
          </button>
        </div>
      )
    }
  }
}

//FETCH_PRODUCTS ACTION CREATOR + THUNK
// // action creator
// const GET_PRODUCTS = 'GET_PRODUCTS'
// const getProducts () => ({type: GET_PRODUCTS, products})

// //reducer case
// case GET_PRODUCTS:
// return action.products

// // thunk
// const fetchProducts = () => {
//   async dispatch => {
//     const {data} = axios.get('/api/products')
//     dispatch(getProducts(data))
//   }
// }

//CHECK ASSUMPTION: FETCHPRODUCTS IN MAIN?
const mapStateToProps = state => ({
  products: state.products,
  reviews: state.reviews
})

export default connect(mapStateToProps)(allProducts)
