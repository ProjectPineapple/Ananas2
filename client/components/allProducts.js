import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {fetchAllProducts, createProduct} from '../store/allProducts'
import {addToCartThunk} from '../store/viewCart'
import {commaSeparateNumber} from '../utilityMethods'

import {Grid, Rating, Button, Icon, Item} from 'semantic-ui-react'

const AllProducts = props => {
  // const [isClicked, setIsClicked] = useState(false)
  const user = useSelector(state => state.user)
  const isAdmin = user.status === 'admin'
  const products = useSelector(state => state.allProducts)
  // const orderLineItems = useSelector(state => state.viewCart.OrderLineItems)
  const orderId = useSelector(state => state.viewCart.id)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [])

  //ADD ADDTOCART THUNK HERE!
  const handleClickAdd = event => {
    dispatch(addToCartThunk(+event.target.value, orderId))
  }

  return products === undefined || !products.length ? (
    <h1>
      <Button.Group floated="left">
        {isAdmin ? (
          <Button>
            <Link to="/add/products">Add Product</Link>
          </Button>
        ) : null}
      </Button.Group>No Products
    </h1>
  ) : (
    <div>
      <Button.Group floated="left">
        {isAdmin ? (
          <Button>
            <Link to="/add/products">Add Product</Link>
          </Button>
        ) : null}
      </Button.Group>
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
    </div>
  )
}

export default withRouter(AllProducts)
