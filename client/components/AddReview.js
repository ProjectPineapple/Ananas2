import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {withRouter} from 'react-router'
import {addReviewThunk} from '../store/addReview'
import {
  Button,
  Divider,
  Form,
  Icon,
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
  let {stars, description, photo1, photo2, photo3} =
    useSelector(state => state.addedReview) || {}
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

  const handleChangePhoto1 = (e, {name, value}) => {
    photo1 = value
  }

  const handleChangePhoto2 = (e, {name, value}) => {
    photo2 = value
  }

  const handleChangePhoto3 = (e, {name, value}) => {
    photo3 = value
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!description) {
      setError(!error)
    } else {
      stars = stars.toFixed(2) //string with 2 decimal places (ex: 4.00)
      const photos = [photo1, photo2, photo3]
      console.log('Photos!', photos)
      const reviewData = {
        stars,
        description,
        photos
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
      <Modal.Content>
        <p>
          <strong>Rate your purchase</strong>
        </p>
        <Rating
          clearable
          defaultRating={0}
          maxRating={5}
          size="massive"
          onRate={handleRate}
        />
        <Divider hidden />
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
          <Message
            icon="exclamation triangle"
            width={8}
            error
            header="Rude!"
            content="Review description cannot be blank."
          />
          <Divider hidden />
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Photo 1"
              placeholder="Photo url (optional)"
              value={photo1}
              onChange={handleChangePhoto1}
            />
            <Form.Input
              fluid
              label="Photo 2"
              placeholder="Photo url (optional)"
              value={photo2}
              onChange={handleChangePhoto2}
            />
            <Form.Input
              fluid
              label="Photo 3"
              placeholder="Photo url (optional)"
              value={photo3}
              onChange={handleChangePhoto3}
            />
          </Form.Group>
          <Divider hidden />
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
