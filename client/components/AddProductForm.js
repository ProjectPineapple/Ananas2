import React from 'react'
import {setProduct} from '../store/allProducts'
import {connect} from 'react-redux'
import {Form, Header} from 'semantic-ui-react'

const tags = [
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

class AddProductForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: Number(this.props.match.params.id),
      name: this.props.product.name,
      price: this.props.product.price,
      stock: this.props.product.stock,
      tags: this.props.product.tags,
      photos: this.props.product.photos,
      description: this.props.product.description
    }

    return (
      <Form>
        <Header>Add a Product</Header>
        <Form.Group widths="equal">
          <Form.Input fluid label="Name" placeholder="Name" value="name" />
          <Form.Input fluid label="Price" placeholder="Price" value="price" />
          <Form.Input fluid label="Stock" placeholder="Stock" value="stock" />
          <label>Tags</label>
          <Form.Select
            fluid
            label="Tag 1"
            options={tags}
            placeholder="Select Tags"
            value="tags1"
          />
          <Form.Select
            fluid
            label="Tag 2"
            options={tags}
            placeholder="Select Tags"
            value="tags2"
          />
          <Form.Select
            fluid
            label="Tag 3"
            options={tags}
            placeholder="Select Tags"
            value="tags3"
          />
          <label>Photos</label>
          <Form.Input
            fluid
            label="Photo 1"
            placeholder="Input Photo URL"
            value="photo1"
          />
          <Form.Input
            fluid
            label="Photo 2"
            placeholder="Input Photo URL"
            value="photo2"
          />
          <Form.Input
            fluid
            label="Photo 3"
            placeholder="Input Photo URL"
            value="photo3"
          />
        </Form.Group>
        <Form.TextArea
          label="Description"
          placeholder="Description of the Product"
          value="description"
        />
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const product = {
        name: evt.target.value.name,
        price: evt.target.value.price,
        stock: evt.target.value.stock,
        tags: [
          evt.target.value.tags1,
          evt.target.value.tags2,
          evt.target.value.tags3
        ],
        photos: [
          evt.target.value.photo1,
          evt.target.value.photo2,
          evt.target.value.photo3
        ],
        description: evt.target.value.description
      }
      evt.target.reset()
      dispatch(setProduct(product))
    },
    handleChange(evt) {
      this.setState({
        [evt.target.name]: evt.target.value,
        [evt.target.price]: evt.target.value,
        [evt.target.stock]: evt.target.value,
        [evt.target.tags1]: evt.target.value,
        [evt.target.tags2]: evt.target.value,
        [evt.target.tags3]: evt.target.value,
        [evt.target.photo1]: evt.target.value,
        [evt.target.photo2]: evt.target.value,
        [evt.target.photo3]: evt.target.value,
        [evt.target.description]: evt.target.value
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(AddProductForm)
