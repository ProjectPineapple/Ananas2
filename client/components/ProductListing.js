import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchSingleProduct, deleteProduct} from '../store/singleProduct'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'

import {Button, Segment, Image, Label, Header} from 'semantic-ui-react'
import ProductReviews from './ProductReviews'
import UpdateProjectForm from './UpdateProductForm'
import AddToCartButton from './AddToCartButton'

import {PriceToCents} from '../utilityMethods'
// import UpdateProjectForm from './UpdateProductForm'

const ProductListing = props => {
  const user = useSelector(state => state.user)
  const isAdmin = user.status === 'admin'
  const product = useSelector(state => state.singleProduct)
  const lineItems = useSelector(state => state.viewCart.OrderLineItems) || []

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
      <div>
        <Segment basic>
          <Header as="h1">{product.name}</Header>
          <AddToCartButton
            productToAdd={product}
            productInCart={
              lineItems.find(item => item.productId === product.id) || {}
            }
          />
          {isAdmin ? (
            <Button onClick={() => dispatch(deleteProduct(product.id))}>
              Delete
            </Button>
          ) : null}
          {isAdmin ? (
            <Link to={`/update/products/${product.id}/`}>
              <Button>Update</Button>
            </Link>
          ) : null}
          {product.photos.map((photo, index) => (
            <Image src={photo} size="medium" floated="left" key={index} />
          ))}
          <h3>
            Stock: {product.stock}{' '}
            {product.stock < 10 ? ' -- Running low get yours now!' : null}
          </h3>
          <h3>Price: {PriceToCents(product.price)}</h3>
          <h3>{product.description}</h3>
          {product.tags.map((tag, index) => {
            return (
              <Label
                key={index}
                onClick={() =>
                  props.history.push(`/products/?categories=${tag}`)
                }
                tag
              >
                {tag}
              </Label>
            )
          })}
          <br />
        </Segment>
        <Segment basic padded="very">
          <Header>Reviews</Header>
          <ProductReviews product={product} reviews={product.reviews} />
        </Segment>
      </div>
    )
  }
}

export default withRouter(ProductListing)
