import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, deleteProduct} from '../store/singleProduct'
import {Rating, Button, Segment, Image, Label} from 'semantic-ui-react'

class ProductListing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdmin: false
    }
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
        <Segment basic textAlign="center">
          <h1>{product.name}</h1>
          {this.state.isAdmin && (
            <Button onClick={() => deleteProduct(product.id)}>Delete</Button>
          )}
          {/* {this.state.isAdmin && (
            <Button onClick={() => <ProjectForm />}>Update</Button>
          )} */}
          {product.photos.map(photo => {
            return (
              <Image
                src={product.photos}
                size="small"
                floated="left"
                key={photo.id}
              />
            )
          })}
          <h3>{product.stock}</h3>
          <h3>{product.description}</h3>
          {product.tags.map(tag => {
            return (
              <Label as="a" key={tag.id} tag>
                {tag}
              </Label>
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
        </Segment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing)
