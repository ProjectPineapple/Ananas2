import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Form, Header} from 'semantic-ui-react'
import {
  addAProduct,
  setName,
  setPrice,
  setDescription,
  setPhoto1,
  setPhoto2,
  setPhoto3,
  setStock,
  setTag1,
  setTag2,
  setTag3
} from '../store/addProduct'

const savedTags = [
  {key: '0', text: 'WWI', value: 'WWI'},
  {key: '1', text: 'WWII', value: 'WWII'},
  {key: '2', text: '305 mm', value: '305 mm'},
  {key: '3', text: 'France', value: 'France'},
  {key: '4', text: 'French', value: 'French'},
  {key: '5', text: 'naval', value: 'naval'},
  {key: '6', text: 'heavy cruiser', value: 'heavy cruiser'},
  {key: '7', text: 'Russian', value: 'Russian'},
  {key: '8', text: 'destroyer', value: 'destroyer'},
  {key: '9', text: 'U.S.', value: 'U.S.'},
  {key: '10', text: 'British', value: 'British'},
  {key: '11', text: 'steel', value: 'steel'},
  {key: '12', text: 'retrofitted', value: 'retrofitted'},
  {key: '13', text: 'light aircraft carrier', value: 'light aircraft carrier'},
  {key: '14', text: 'battleship', value: 'battleship'},
  {key: '15', text: 'gently used', value: 'gently used'},
  {key: '16', text: 'fixer upper', value: 'fixer upper'}
]

const AddProductForm = function(props) {
  const dispatch = useDispatch()
  const {name, price, stock, tags, photos, description} = useSelector(
    state => state.addProduct
  )

  const handleSubmit = e => {
    e.preventDefault()
    const productData = {
      name,
      price,
      stock,
      tags,
      photos,
      description
    }
    dispatch(addAProduct(productData))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Header>Add a Product</Header>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          label="Name"
          placeholder="Name"
          value={name}
          onChange={e => dispatch(setName(e.target.value))}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          label="Price"
          placeholder="Price"
          value={price}
          onChange={e => dispatch(setPrice(e.target.value))}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          label="Stock"
          placeholder="Stock"
          value={stock}
          onChange={e => dispatch(setStock(e.target.value))}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Select
          fluid
          label="Tag 1"
          options={savedTags}
          placeholder="Select Tags"
          value={tags[0]}
          onChange={e => dispatch(setTag1(e.target.value))}
        />
        <Form.Select
          fluid
          label="Tag 2"
          options={savedTags}
          placeholder="Select Tags"
          value={tags[1]}
          onChange={e => dispatch(setTag2(e.target.value))}
        />
        <Form.Select
          fluid
          label="Tag 3"
          options={savedTags}
          placeholder="Select Tags"
          value={tags[2]}
          onChange={e => dispatch(setTag3(e.target.value))}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          label="Photo 1"
          placeholder="Input Photo URL"
          value={photos[0]}
          onChange={e => dispatch(setPhoto1(e.target.value))}
        />
        <Form.Input
          fluid
          label="Photo 2"
          placeholder="Input Photo URL"
          value={photos[1]}
          onChange={e => dispatch(setPhoto2(e.target.value))}
        />
        <Form.Input
          fluid
          label="Photo 3"
          placeholder="Input Photo URL"
          value={photos[2]}
          onChange={e => dispatch(setPhoto3(e.target.value))}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.TextArea
          label="Description"
          placeholder="Description of the Product"
          value={description}
          onChange={e => dispatch(setDescription(e.target.value))}
        />
      </Form.Group>
      <Form.Button>Submit</Form.Button>
    </Form>
  )
}

// class AddProductForm extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       id: Number(this.props.match.params.id),
//       name: this.props.product.name,
//       price: this.props.product.price,
//       stock: this.props.product.stock,
//       tags: this.props.product.tags,
//       photos: this.props.product.photos,
//       description: this.props.product.description
//     }

//     return (
//       <Form>
//         <Header>Add a Product</Header>
//         <Form.Group widths="equal">
//           <Form.Input fluid label="Name" placeholder="Name" value="name" />
//           <Form.Input fluid label="Price" placeholder="Price" value="price" />
//           <Form.Input fluid label="Stock" placeholder="Stock" value="stock" />
//           <label>Tags</label>
//           <Form.Select
//             fluid
//             label="Tag 1"
//             options={tags}
//             placeholder="Select Tags"
//             value="tags1"
//           />
//           <Form.Select
//             fluid
//             label="Tag 2"
//             options={tags}
//             placeholder="Select Tags"
//             value="tags2"
//           />
//           <Form.Select
//             fluid
//             label="Tag 3"
//             options={tags}
//             placeholder="Select Tags"
//             value="tags3"
//           />
//           <label>Photos</label>
//           <Form.Input
//             fluid
//             label="Photo 1"
//             placeholder="Input Photo URL"
//             value="photo1"
//           />
//           <Form.Input
//             fluid
//             label="Photo 2"
//             placeholder="Input Photo URL"
//             value="photo2"
//           />
//           <Form.Input
//             fluid
//             label="Photo 3"
//             placeholder="Input Photo URL"
//             value="photo3"
//           />
//         </Form.Group>
//         <Form.TextArea
//           label="Description"
//           placeholder="Description of the Product"
//           value="description"
//         />
//         <Form.Button>Submit</Form.Button>
//       </Form>
//     )
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const product = {
//         name: evt.target.value.name,
//         price: evt.target.value.price,
//         stock: evt.target.value.stock,
//         tags: [
//           evt.target.value.tags1,
//           evt.target.value.tags2,
//           evt.target.value.tags3
//         ],
//         photos: [
//           evt.target.value.photo1,
//           evt.target.value.photo2,
//           evt.target.value.photo3
//         ],
//         description: evt.target.value.description
//       }
//       evt.target.reset()
//       dispatch(setProduct(product))
//     },
//     handleChange(evt) {
//       this.setState({
//         [evt.target.name]: evt.target.name.value,
//         [evt.target.price]: evt.target.price.value,
//         [evt.target.stock]: evt.target.stock.value,
//         [evt.target.tags1]: evt.target.tag1.value,
//         [evt.target.tags2]: evt.target.tag2.value,
//         [evt.target.tags3]: evt.target.tag3.value,
//         [evt.target.photo1]: evt.target.photo1.value,
//         [evt.target.photo2]: evt.target.photo2.value,
//         [evt.target.photo3]: evt.target.photo3.value,
//         [evt.target.description]: evt.target.description.value
//       })
//     }
//   }
// }
export default AddProductForm
