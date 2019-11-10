import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {withRouter} from 'react-router'
import {addReviewThunk} from '../store/addReview'
import {
  Button,
  Form,
  Icon,
  Image,
  Message,
  Modal,
  Rating,
  TextArea
} from 'semantic-ui-react'

const AddReview = props => {
  const {product} = props
  const [isClickedClose, setIsClickedClose] = useState(false)
  const [isClickedAddReview, setIsClickedAddReview] = useState(false)
  const [open, setOpen] = useState(false)
  const [dimmer, setDimmer] = useState(true)
  const [error, setError] = useState(false)
  //photo logic TK (photo1, photo2, photo)
  let {stars, description} = useSelector(state => state.addedReview) || {}
  const dispatch = useDispatch()

  const handleClickAddReview = () => {
    setDimmer(true)
    setOpen(!open)
    setIsClickedAddReview(!isClickedAddReview)
  }

  const handleClickClose = () => {
    setOpen(!open)
    setIsClickedClose(!isClickedClose)
  }

  // let stars
  ///NEED TO SEND RATING + DESCRIPTION TO DB
  const handleRate = (e, {rating}) => {
    stars = rating
  }

  const handleChange = (e, {name, value}) => {
    description = value
  }

  const handleSubmit = e => {
    e.preventDefault()
    // const photos = [photo1, photo2, photo3]
    if (!description) {
      setError(!error)
      console.log('Error: ', error)
    } else {
      stars = stars.toFixed(2) //string with 2 decimal places (ex: 4.00)
      console.log("Here's the description: ", description)
      const reviewData = {
        stars,
        description
      }
      dispatch(addReviewThunk(reviewData, product.id))
      //NOTE: Currently reroutes to user's home page
      props.history.push(`/home`)
    }
  }

  return (
    <Modal
      trigger={
        <Button onClick={handleClickAddReview}>
          <Icon name="write" />Write a Review!
        </Button>
      }
      dimmer={dimmer}
      open={open}
      onClose={handleClickClose}
    >
      <Button type="icon" onClick={handleClickClose}>
        <Icon name="window close" />
      </Button>
      <Modal.Header>Review your purchase</Modal.Header>
      <Modal.Content image scrolling>
        <div className="productDetails">
          <h3>
            <strong>{product.name}</strong>
          </h3>
          <p>{product.description}</p>
        </div>
        <Image src={product.photos[0]} size="small" className="productImg" />
        <h3>Rate your purchase</h3>
        <Rating
          clearable
          defaultRating={0}
          maxRating={5}
          size="massive"
          onRate={handleRate}
        />
        <Form error={error}>
          <Form.Field
            style={{minHeight: 100}}
            width={12}
            control={TextArea}
            value={description}
            onChange={handleChange}
            label="Add a written review"
            placeholder="What did you like or dislike about your battleship? How did you use it?"
            required={true}
          />
          {/* <Form.Group widths="equal">
          <Form.Input
            label="Photo 1"
            placeholder="Insert your photo URL"
            value={photo1}
            onChange={e => dispatch(setPhoto1(e.target.value))}
          />
          <Form.Input
            fluid
            label="Photo 2"
            placeholder="Input Photo URL"
            value={photo2}
            onChange={e => dispatch(setPhoto2(e.target.value))}
          />
          <Form.Input
            fluid
            label="Photo 3"
            placeholder="Input Photo URL"
            value={photo3}
            onChange={e => dispatch(setPhoto3(e.target.value))}
          />
        </Form.Group> */}
          <br />
          <Message
            width={12}
            error
            header="Rude!"
            content="Review description cannot be blank. Please provide a written review."
          />
          <Form.Field
            control={Button}
            color="green"
            content="Submit Review"
            onClick={handleSubmit}
          />
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default withRouter(AddReview)
