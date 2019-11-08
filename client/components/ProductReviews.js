import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
// import {fetchReviews} from '../store/reviews'
import {Icon, Image, List, Rating, Segment} from 'semantic-ui-react'

///fetchReviews
///need to set product's reviews on state [api routes, probs]

///PATH WILL PROBABLY BE .... /:productId?
const ProductReviews = props => {
  const {reviews} = props
  // const user = useSelector(state => state.user)
  // console.log('TCL: user', user)
  //NEED LINK TO ADD REVIEW ROUTE (around "be the first")
  return !reviews.length ? (
    <div>
      <p>
        No customer reviews yet. <Icon name="frown outline" />{' '}
      </p>
      <p>
        Have you purchased this battleship? Be the first to share your thoughts!
      </p>
    </div>
  ) : (
    ///Review has: user, stars, description, created date
    <div>
      <List>
        {reviews.map(review => {
          let stars = Number(review.stars)
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
    </div>
  )
}

export default ProductReviews
