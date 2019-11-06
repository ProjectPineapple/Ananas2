import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, deleteProduct} from '../store/singleProduct'
import {Rating, Button} from 'semantic-react-ui'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    const productId = Number(this.props.match.params.productId)
    this.props.loadSingleProduct(productId)
  }

  render() {
    const {product} = this.props
    if (!product) {
      return <div>'No Ship'</div>
    } else {
      return (
        <div className="ui center aligned basic segment">
          <h1>{product.name}</h1>{' '}
          <Button onClick={() => this.props.deleteProduct(product.id)}>
            Delete
          </Button>
          {product.photos.map(photo => {
            return (
              <div className="ui small left floated image" key={photo.id}>
                <img src={product.photos} />
              </div>
            )
          })}
          <h3>{product.description}</h3>
          {product.tags.map(tag => {
            return (
              <div className="ui label" key={tag.id}>
                {tag}
              </div>
            )
          })}
          <h2>Reviews</h2>
          {product.reviews ? (
            <p>
              {product.reviews.map(review => {
                return (
                  <ul key={review.id}>
                    <Rating icon="star" defaultRating={5} maxRating={5} />
                    <p>{review.description}</p>
                  </ul>
                )
              })}
            </p>
          ) : (
            <div>No Reviews</div>
          )})
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
