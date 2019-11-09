import React, {useSelector} from 'react'
import {useDispatch} from 'react-redux'
import {addAReview} from '../store/reviews'
import {Icon, Form} from 'semantic-ui-react'

const AddReview = props => {
  const {product} = props
  // const {stars, description, photo1, photo2, photo3} = useSelector(
  //   state => state.newReview
  // )
  const dispatch = useDispatch()

  const handleSubmit = () => {
    // const photos = [photo1, photo2, photo3]
    console.log('handled submit')
    const reviewData = {
      stars: '5.00',
      description: 'SJLMSKDL'
    }
    dispatch(addAReview(reviewData))
  }

  return (
    <Form>
      <Icon name="window close" />
    </Form>
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

export default AddReview
