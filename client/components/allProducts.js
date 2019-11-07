import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts, createProduct} from '../store/allProducts'
import {Grid, Rating, Button, Item} from 'semantic-ui-react'

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
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllProducts(), createProduct())
  }, [])

  // const checkIsAdmin = props => {
  //   console.log(props)
  //   setIsAdmin(state => ({isActive: !state.isActive}))
  // }

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
            <Item.Meta>
              <span>Price ${commaSeparateNumber(product.price / 100)}</span>
            </Item.Meta>
            <Rating
              icon="star"
              defaultRating={product.stars}
              maxRating={5}
              disabled
            />
            <Item.Description>
              {product.description.slice(0, 80)}
            </Item.Description>
            {/* AddNewButton (createProduct thunk) works; will use path(?) to determine if isAdmin === true */}
            {/* <Button
		onClick={() =>
                dispatch(
                createProduct({
                name: 'U.S.S. Testing Add Product Thunk',
                description:
                "Intrepid. Retrofitted. Perfect for a billionaire's pool.",
                stock: 43,
                tags: ['Pool-side', 'battleship', 'gently used'],
                price: 430000000
                })
                )
		}
		>
		Add New Product
		</Button> */}
          </Item.Content>
        </Grid.Column>
      ))}
    </Grid>
  )
}

export default AllProducts
