import React, {useState} from 'react'
import {Button, Icon, Image, List, Rating, Segment} from 'semantic-ui-react'
import AddReview from './AddReview'

//NOTE: Not importing fetchAllReviews thunk b/c the single product GET route has eager loading;
const ProductReviews = props => {
  const {product, reviews} = props
  const [isClickedNoReviews, setIsClickedNoReviews] = useState(false)
  const [isClickedReviewsExist, setIsClickedReviewsExist] = useState(false)

  const handleClickNoReviews = () => {
    setIsClickedNoReviews(!isClickedNoReviews)
  }

  const handleClickReviewsExist = () => {
    setIsClickedReviewsExist(!isClickedReviewsExist)
  }

  //NEED LINK TO ADDREVIEW ROUTE (around "be the first")
  return !reviews.length ? (
    <div>
      <p>
        No customer reviews yet. <Icon name="frown outline" />
      </p>
      <p>
        Have you purchased this battleship? Be the first to share your thoughts!
      </p>
      <Button onClick={handleClickNoReviews}>
        <Icon name="write" />Write a Review!
      </Button>
    </div>
  ) : (
    <div>
      <List>
        {reviews.map(review => {
          let stars = Number(review.stars)
          let reviewDate = review.updatedAt.toString().slice(0, 10)

          return (
            <Segment textAlign="left" key={review.id}>
              <List.Item>
                <Image
                  avatar
                  src="https://upload.wikimedia.org/wikipedia/commons/d/de/John_Hoppner_-_Portrait_of_Lord_Nelson.jpg"
                />
                <List.Header>
                  <h5>Admiral Akbar</h5>
                </List.Header>
                <List.Content>
                  <p>{reviewDate}</p>
                  <Rating defaultRating={stars} maxRating={5} disabled />
                  <p>{review.description}</p>
                </List.Content>
              </List.Item>
            </Segment>
          )
        })}
      </List>
      <p>
        Have you purchased this battleship? Share your thoughts with others!
      </p>
      <Button onClick={handleClickReviewsExist}>
        <Icon name="write" />Write a Review!
      </Button>
      {isClickedReviewsExist ? <AddReview product={product} /> : <span />}
    </div>
  )
}

export default ProductReviews
