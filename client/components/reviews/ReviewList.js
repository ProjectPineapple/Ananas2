import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Icon, Image, List, Rating, Segment} from 'semantic-ui-react'
import {fetchAllUsers} from '../../store/allUsers'

//NOTE: Not importing fetchAllReviews thunk b/c the single product GET route has eager loading;
const ReviewList = props => {
  const {reviews} = props
  const users = useSelector(state => state.allUsers)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  return !reviews.length ? (
    <div>
      <p>
        No customers have submitted reviews yet. <Icon name="frown outline" />
      </p>
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
                  {/* <h3>{productName}</h3>
                  <Image src={productPhoto} /> */}
                  <Rating defaultRating={stars} maxRating={5} disabled />
                  <p>{review.description}</p>
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
    </div>
  )
}

export default ReviewList
