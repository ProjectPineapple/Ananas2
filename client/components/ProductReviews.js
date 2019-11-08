import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
// import {fetchReviews} from '../store/reviews'
import {Rating} from 'semantic-ui-react'

///fetchReviews
///need to set product's reviews on state [api routes, probs]

///PATH WILL PROBABLY BE .... /:productId?
const ProductReviews = props => {
  const {product, reviews} = props
  console.log('product', product)
  console.log('reviews', reviews)
  ///if no reviews, return a simple message
  return !reviews.length ? (
    <div>
      <h2>No customer reviews yet for {product.name}</h2>
      <h3>
        Have you purchased this battleship? Be the first to share your thoughts!
      </h3>
    </div>
  ) : (
    ///Review has: user, stars, description, created date
    <div>
      {reviews.map(review => {
        let stars = Number(review.stars)
        console.log('TCL: stars', stars)
        return (
          <ul key={review.id}>
            <Rating icon="star" defaultRating={stars} />
            <p>{review.description}</p>
          </ul>
        )
      })}
    </div>
  )
}

export default ProductReviews
