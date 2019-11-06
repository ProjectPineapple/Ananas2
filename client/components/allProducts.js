import React, {useEffect, useState} from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts} from '../store/allProducts'
import {Image, Item} from 'semantic-ui-react'

const AllProducts = props => {
  const [isClicked, setIsClicked] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const products = useSelector(state => state.allProducts)
  const dispatch = useDispatch()
  console.log('HERES THE PRODUCTS', products)
  useEffect(() => {
    console.log('in UseEffect')
    dispatch(fetchAllProducts())
  }, [])
  return products === undefined || !products.length ? (
    <h1>No Products</h1>
  ) : (
    <Item.Group>
      {products.map(product => (
        <Item key={product.id}>
          <Link to={`/products/${product.id}`}>
            <Item.Image size="tiny" src={product.photos[0]} />
          </Link>
          <Item.Content>
            <Item.Header>{product.name}</Item.Header>
            <Item.Meta>
              <span className="price">{product.price}</span>
              <span className="rating">{product.rating}</span>
            </Item.Meta>
            <Item.Description>
              {product.description.slice(0, 50)}
            </Item.Description>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  )
}

export default AllProducts
