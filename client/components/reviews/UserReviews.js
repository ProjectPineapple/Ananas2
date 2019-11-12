import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Icon, Image, List, Rating, Segment} from 'semantic-ui-react'
import {fetchUserReviews} from '../../store/userReviews'

//NOTE: Not importing fetchAllReviews thunk b/c the single product GET route has eager loading;
const UserReviews = props => {
  const {userId, displayName} = props
  const userReviews = useSelector(state => state.userReviews)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserReviews(userId))
  }, [])

  return !userReviews.length ? (
    <div>
      <p>
        You haven't submitted any product reviews yet. Check out the orders tab
        for your recent purchases. <Icon name="frown outline" />
      </p>
    </div>
  ) : (
    <div>
      <List>
        {userReviews.map(review => {
          let stars = Number(review.stars)
          let reviewDate = review.updatedAt.toString().slice(0, 10)
          let productName = review.product.name
          let productDescription = review.product.description
          let productPhoto = review.product.photos[0]

          return (
            <Segment textAlign="left" key={review.id}>
              <List.Item>
                <Image
                  avatar
                  src="https://upload.wikimedia.org/wikipedia/commons/d/de/John_Hoppner_-_Portrait_of_Lord_Nelson.jpg"
                />
                <List.Header>
                  <h5>{displayName}</h5>
                </List.Header>
                <List.Content>
                  <p>{reviewDate}</p>
                  <h3>{productName}</h3>
                  <Image src={productPhoto} size="small" />
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
    </div>
  )
}

export default UserReviews
