import React from 'react'
import {changeProduct} from '../store/singleProduct'
import {setProduct} from '../store/allProducts'
import {connect} from 'react-redux'
import {Form} from 'semantic-ui-react'

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

const ProductForm = props => {
  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Input fluid label="Name" placeholder="Name" />
        <Form.Input fluid label="Price" placeholder="Price" />
        <Form.Input fluid label="Stock" placeholder="Stock" />
        <Form.Select fluid label="Tags" options={tags} placeholder="Tags" />
        <label>Photos</label>
        <Form.Input fluid label="Photo 1" placeholder="Photo 1" />
        <Form.Input fluid label="Photo 2" placeholder="Photo 2" />
        <Form.Input fluid label="Photo 3" placeholder="Photo 3" />
      </Form.Group>
      <Form.TextArea
        label="Description"
        placeholder="Description of the Product"
      />
      <Form.Button>Submit</Form.Button>
    </Form>
  )
}

export default ProductForm
