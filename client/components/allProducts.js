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
      return (
        <Item.Group>
          {products.map(product => (
            <Item key={product.id}>
              <Link to={`/products/${product.id}`}>
                <Item.Image size="tiny" src={product.photos[0]} />
              </Link>
              <Item.Content>
                <Item.Header>{product.name}</Item.Header>
                <Item.Meta>
                  <span className="price">{product.price}</span>
                  <span className="rating">{product.rating}</span>
                </Item.Meta>
                <Item.Description>{truncatedDesc}</Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      )
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
