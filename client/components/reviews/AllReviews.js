import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Icon, Image, List, Rating, Segment} from 'semantic-ui-react'
import {fetchAllReviews} from '../../store/reviews'

//NOTE: Not importing fetchAllReviews thunk b/c the single product GET route has eager loading;
const AllReviews = props => {
  const allReviews = useSelector(state => state.allReviews)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllReviews())
  })

  return !allReviews.length ? (
    <div>
      <p>
        No customers have written reviews yet. <Icon name="frown outline" />
      </p>
    </div>
  ) : (
    <div>
      <List>
        {allReviews.map(review => {
          let stars = Number(review.stars)
          let reviewDate = review.updatedAt.toString().slice(0, 10)
          console.log(review)
          let productName = review.product.name
          let productPhoto = review.photos[0]

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
                  <h3>{productName}</h3>
                  <Image src={productPhoto} />
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

export default AllReviews
