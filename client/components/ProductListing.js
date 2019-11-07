import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchSingleProduct, deleteProduct} from '../store/singleProduct'
import {Rating, Button, Segment, Image, Label} from 'semantic-ui-react'
import UpdateProjectForm from './UpdateProductForm'

const ProductListing = props => {
  const [isAdmin, setIsAdmin] = useState(false)
  const product = useSelector(state => state.singleProduct)
  const productId = Number(this.props.match.params.id)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSingleProduct(productId))
  }, [])

  if (!product) {
    return <div>'No Ship'</div>
  } else {
    return (
      <Segment basic textAlign="center">
        <h1>{product.name}</h1>
        {this.state.isAdmin && (
          <Button onClick={() => deleteProduct(product.id)}>Delete</Button>
        )}
        {this.state.isAdmin && (
          <Button onClick={() => <UpdateProjectForm />}>Update</Button>
        )}
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

export default ProductListing
