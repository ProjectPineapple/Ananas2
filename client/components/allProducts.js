import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {ProductListing} from './productListing'
import {fetchProducts} from '../store/allProducts'
import {Image, Item} from 'semantic-ui-react'

class allProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isClicked: false,
      isAdmin: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  //FOR VIEWING INDIVIDUAL PRODUCT
  // handleClick() {
  //   this.setState(state => ({isClicked: !state.isClicked}))
  // }

  render() {
    const products = this.props.products
    // const btnClicked = this.state.isClicked
    // const isAdmin = this.state.isAdmin
    const truncatedDesc = products.description.slice(0, 50)

    if (products === undefined || !products.length) {
      return <h1>No Products</h1>
    } else {
      return <h2>allProducts</h2>
    }
  }
}

const mapStateToProps = state => ({
  products: state.products
  // reviews: state.reviews
})

const mapDispatchToState = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts)
})

export default connect(mapStateToProps)(mapDispatchToState)(allProducts)
