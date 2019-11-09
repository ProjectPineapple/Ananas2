import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {fetchAllProducts, createProduct} from '../store/allProducts'
import {addToCart} from '../store/viewCart'
import {commaSeparateNumber} from '../utilityMethods'
import AddToCartButton from './AddToCartButton'
import querystring from 'query-string'

import {Grid, Rating, Button, Icon, Item, Form, Input} from 'semantic-ui-react'

const AllProducts = ({history, location}) => {
  // const [isClicked, setIsClicked] = useState(false)
  const user = useSelector(state => state.user)
  const isAdmin = user.status === 'admin'
  const products = useSelector(state => state.allProducts)
  const orderId = useSelector(state => state.viewCart.id)
  const dispatch = useDispatch()
  // cDm
  useEffect(() => {
    console.log(location.search)
    // const params = querystring.parse(location.search)
    // const urlQueryString =
    // console.log('QuerystringParams: ', params)
    dispatch(fetchAllProducts(location.search))
  }, [])

  const handleSearchSubmit = event => {
    if (event.keyCode === 13) {
      const form = event.target.value
      console.log(form)
      const searchParam = event.target.value
      dispatch(fetchAllProducts(`?search=${searchParam}`))
      history.push(`/products?search=${searchParam}`)
    }
  }

  return products === undefined || !products.length ? (
    <h1>
      <Button.Group floated="left">
        {isAdmin ? (
          <Button onClick={() => history.push('/add/products')}>
            Add Product
          </Button>
        ) : null}
      </Button.Group>No Products
    </h1>
  ) : (
    <div>
      <Input placeholder="Search..." onKeyDown={handleSearchSubmit} />
      {/*COLLIN WHYYYYY BUTTON HAVE TO BE IN FORM TO WORK} */}
      {isAdmin ? (
        <Button onClick={() => history.push('/add/products')}>
          Add Product
        </Button>
      ) : null}
      <Grid textAlign="center" columns="three" stackable padded>
        {products.map(product => (
          <Grid.Column key={product.id}>
            <Link to={`/view/product/${product.id}`}>
              <Item.Image size="small" src={product.photos[0]} />
            </Link>
            <Item.Content>
              <Link to={`/view/product/${product.id}`}>
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
                {product.description.slice(0, 80) + '...'}
              </Item.Description>
              <AddToCartButton productToAdd={product} />
            </Item.Content>
          </Grid.Column>
        ))}
      </Grid>
    </div>
  )
}

export default withRouter(AllProducts)
