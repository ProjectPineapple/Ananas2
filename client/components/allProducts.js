import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {fetchAllProducts, createProduct} from '../store/allProducts'
import {addToCart} from '../store/viewCart'

import {Grid, Rating, Button, Icon, Item} from 'semantic-ui-react'

// from https://stackoverflow.com/questions/3883342/add-commas-to-a-number-in-jquery
const commaSeparateNumber = val => {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2')
  }
  return val
}

const AllProducts = props => {
  const [isClicked, setIsClicked] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const products = useSelector(state => state.allProducts)
  const orderLineItems = useSelector(state => state.viewCart.OrderLineItems)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [])

  //ADD ADDTOCART THUNK HERE!
  const handleClickAdd = event => {
    dispatch(addToCart(+event.target.value, orderLineItems))
  }

  return products === undefined || !products.length ? (
    <h1>No Products</h1>
  ) : (
    <Grid textAlign="center" columns="three" stackable padded>
      {products.map(product => (
        <Grid.Column key={product.id}>
          <Link to={`/products/${product.id}`}>
            <Item.Image size="small" src={product.photos[0]} />
          </Link>
          <Item.Content>
            <Link to={`/products/${product.id}`}>
              <Item.Header>{product.name}</Item.Header>
            </Link>
            <Rating
              icon="star"
              defaultRating={product.stars}
              maxRating={5}
              disabled
            />
            <Item.Meta>
              <span>Price ${commaSeparateNumber(product.price / 100)}</span>
            </Item.Meta>
            <Item.Description>
              {product.description.slice(0, 80)}
            </Item.Description>
            <Button
              icon
              color="teal"
              onClick={handleClickAdd}
              value={product.id}
            >
              <Icon name="cart plus" /> Add to Cart
            </Button>
          </Item.Content>
        </Grid.Column>
      ))}
    </Grid>
  )
}

export default withRouter(AllProducts)
