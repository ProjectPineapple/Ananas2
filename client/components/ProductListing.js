import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchSingleProduct, deleteProduct} from '../store/singleProduct'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'

import {Button, Segment, Image, Label} from 'semantic-ui-react'
import ProductReviews from './ProductReviews'
import UpdateProjectForm from './UpdateProductForm'

const commaSeparateNumber = val => {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2')
  }
  return val
}

const ProductListing = props => {
  const user = useSelector(state => state.user)
  const isAdmin = user.status === 'admin'
  const product = useSelector(state => state.singleProduct)
  const order = useSelector(state => state.viewCart)

  const productId = +props.match.params.productId
  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(fetchSingleProduct(productId))
    },
    [productId]
  )

  if (!product) {
    return <div>No Ship</div>
  } else {
    return (
      <Segment basic textAlign="center">
        <h1>{product.name}</h1>
        {/* <Button onClick={() => }>Add to Cart</Button> */}
        {isAdmin ? (
          <Button onClick={() => dispatch(deleteProduct(product.id))}>
            Delete
          </Button>
        ) : null}
        {isAdmin ? (
          <Button>
            <Link to={`/update/products/${product.id}/`} />Update
          </Button>
        ) : null}
        {product.photos.map((photo, index) => (
          <Image src={photo} size="small" floated="left" key={index} />
        ))}
        <h3>Stock: {product.stock}</h3>
        <h3>Price: ${commaSeparateNumber(product.price)}</h3>
        <h3>{product.description}</h3>
        {product.tags.map((tag, index) => {
          return (
            <Label as="a" key={index} tag>
              {tag}
            </Label>
          )
        })}
        <h2>Reviews</h2>
        {/* {product.reviews ? (
          <div> */}
        {/* {product.reviews.map(review => { */}
        <ProductReviews product={product} reviews={product.reviews} />
        {/* // return (
              //   <ul key={review.id}>
              //     <Rating icon="star" defaultRating={5} maxRating={5} />
              //     <p>{review.description}</p>
              //   </ul>
              // )
            })} */}
        {/* </div>
        ) : (
          <div>No Reviews</div> */}
        )}
      </Segment>
    )
  }
}

export default withRouter(ProductListing)
