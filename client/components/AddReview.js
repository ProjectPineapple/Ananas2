import React, {useSelector, useState} from 'react'
import {useDispatch} from 'react-redux'
import {addAReview} from '../store/reviews'
import {
  Button,
  Form,
  Icon,
  Image,
  Modal,
  Rating,
  TextArea
} from 'semantic-ui-react'

const AddReview = props => {
  const {product} = props

  const [isClickedClose, setIsClickedClose] = useState(false)
  const [isClickedAddReview, setIsClickedAddReview] = useState(false)
  const [open, setOpen] = useState(false)
  const [dimmer, setDimmer] = useState(false)

  // const {stars, description, photo1, photo2, photo3} = useSelector(
  //   state => state.newReview
  // )
  const dispatch = useDispatch()

  const handleClickAddReview = () => {
    console.log('handledClick for Add Review! dimmer = ', dimmer)
    setDimmer(!dimmer)
    setOpen(!open)
    setIsClickedAddReview(!isClickedAddReview)
  }

  const handleClickClose = () => {
    setDimmer(!dimmer)
    setOpen(!open)
    setIsClickedClose(!isClickedClose)
  }

  ///NEED TO SEND RATING + DESCRIPTION TO DB
  const handleRate = (e, {rating}) => {
    stars = rating
    return stars
  }

  const handleSubmit = () => {
    // const photos = [photo1, photo2, photo3]

    const reviewData = {
      stars,
      description: 'SJLMSKDL'
    }
    dispatch(addAReview(reviewData))
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
        <Form>
          <Form.Field
            style={{minHeight: 100}}
            width={12}
            required
            control={TextArea}
            label="Add a written review"
            placeholder="What did you like or dislike about your battleship? How did you use it?"
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
// const ModalExampleScrollingContent = () => (
//   <Modal trigger={<Button>Scrolling Content Modal</Button>}>
//     <Modal.Header>Profile Picture</Modal.Header>
//     <Modal.Content image scrolling>
//       <Image size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png' wrapped />

//       <Modal.Description>
//         <Header>Modal Header</Header>
//         <p>
//           This is an example of expanded content that will cause the modal's
//           dimmer to scroll
//         </p>

//         {_.times(8, (i) => (
//           <Image
//             key={i}
//             src='https://react.semantic-ui.com/images/wireframe/paragraph.png'
//             style={{ paddingBottom: 5 }}
//           />
//         ))}
//       </Modal.Description>
//     </Modal.Content>
//     <Modal.Actions>
//       {<Button primary>
//         Submit <Icon name='chevron right' />
//       </Button>}
//     </Modal.Actions>
//   </Modal>

console.log(AddReview)
export default AddReview
