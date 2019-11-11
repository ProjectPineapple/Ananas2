import React, {useEffect} from 'react'
import {Icon, Image, List, Rating, Segment} from 'semantic-ui-react'

//NOTE: Not importing fetchAllReviews thunk b/c the single product GET route has eager loading;
const ReviewList = props => {
  const {reviews} = props
  console.log(reviews)

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
          console.log(review)

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
