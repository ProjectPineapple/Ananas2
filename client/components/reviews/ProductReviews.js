import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Icon, Image, List, Rating, Segment} from 'semantic-ui-react'
import AddReview from './AddReview'
import {fetchAllUsers} from '../../store/allUsers'
import {userInfo} from 'os'

//NOTE: Not importing fetchAllReviews thunk b/c the single product GET route has eager loading;
const ProductReviews = props => {
  const {product, reviews} = props
  const users = useSelector(state => state.allUsers)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  return !reviews.length ? (
    <div>
      <p>
        No customer reviews yet. <Icon name="frown outline" />
      </p>
      <p>
        Have you purchased this battleship? Be the first to share your thoughts!
      </p>
      <AddReview product={product} />
    </div>
  ) : (
    <div>
      <List>
        {reviews.map(review => {
          let stars = Number(review.stars)
          let reviewDate = review.updatedAt.toString().slice(0, 10)
          let reviewer = users.find(user => user.id === review.userId) || []

          return (
            <Segment textAlign="left" key={review.id}>
              <List.Item>
                <Image
                  avatar
                  src="https://upload.wikimedia.org/wikipedia/commons/d/de/John_Hoppner_-_Portrait_of_Lord_Nelson.jpg"
                />
                <List.Header>
                  <h5>{reviewer.name}</h5>
                </List.Header>
                <List.Content>
                  <p>{reviewDate}</p>
                  <Rating defaultRating={stars} maxRating={5} disabled />
                  <p>{review.description}</p>
                  {/* INCLUDE ANY REVIEW PHOTOS! NOT SURE OF FORMATTING; maybe MODAL? with NEXT BUTTON? And separate COMPONENT?*/}
                  {!review.photos || !review.photos.length ? (
                    <span />
                  ) : (
                    review.photos.map(photoUrl => (
                      <img key={review.id} src={photoUrl} />
                    ))
                  )}
                </List.Content>
              </List.Item>
            </Segment>
          )
        })}
      </List>
      <p>
        Have you purchased this battleship? Share your thoughts with others!
      </p>
      <AddReview product={product} />
    </div>
  )
}

export default ProductReviews
