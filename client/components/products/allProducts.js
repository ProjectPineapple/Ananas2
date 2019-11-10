import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {fetchAllProducts, createProduct} from '../../store/allProducts'

import {centsToPrice, getAverageRating} from '../../utilityMethods'
import AddToCartButton from './AddToCartButton'
import querystring from 'query-string'

import {
  Grid,
  Rating,
  Button,
  Icon,
  Item,
  Form,
  Input,
  Pagination,
  Header
} from 'semantic-ui-react'

const AllProducts = ({history, location}) => {
  const totalResults = useSelector(state => state.totalItems)
  const user = useSelector(state => state.user)
  const isAdmin = user.status === 'admin'
  const products = useSelector(state => state.allProducts)
  const lineItems = useSelector(state => state.viewCart.OrderLineItems) || []
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
      history.push(`/products?search=${searchParam}`)
    }
  }

  const handlePageChange = (event, {activePage}) => {
    const queryObject = querystring.parse(location.search)
    queryObject.page = activePage
    const queryParams = querystring.stringify(queryObject)
    history.push(`/products?${queryParams}`)
  }

  const currentPage = querystring.parse(location.search).page
    ? querystring.parse(location.search).page
    : 1

  return products === undefined || !products.length ? (
    <div>
      <Input placeholder="Search..." onKeyDown={handleSearchSubmit} />
      <Pagination
        defaultActivePage={currentPage}
        totalPages={Math.ceil(totalResults / 24)}
        onPageChange={handlePageChange}
      />
      <Header as="h3">Total Results : {totalResults}</Header>
      <Button.Group floated="left">
        {isAdmin ? (
          <Button onClick={() => history.push('/add/products')}>
            Add Product
          </Button>
        ) : null}
      </Button.Group>
    </div>
  ) : (
    <div>
      <Input placeholder="Search..." onKeyDown={handleSearchSubmit} />
      <Pagination
        defaultActivePage={currentPage}
        totalPages={Math.ceil(totalResults / 24)}
        onPageChange={handlePageChange}
      />
      <Header as="h3">Total Results : {totalResults}</Header>
      {/*COLLIN WHYYYYY BUTTON HAVE TO BE IN FORM TO WORK} */}
      {isAdmin ? (
        <Button onClick={() => history.push('/add/products')}>
          Add Product
        </Button>
      ) : null}
      <Grid textAlign="center" columns="three" stackable padded>
        {products.map(product => {
          let avgRating = getAverageRating(product.reviews)

          return (
            <Grid.Column key={product.id}>
              <Link to={`/view/product/${product.id}`}>
                <Item.Image size="small" src={product.photos[0]} />
              </Link>
              <Item.Content>
                <Link to={`/view/product/${product.id}`}>
                  <Item.Header>{product.name}</Item.Header>
                </Link>
                <Rating defaultRating={avgRating} maxRating={5} disabled />
                <Item.Meta>
                  <span>Price {centsToPrice(product.price)}</span>
                </Item.Meta>
                <Item.Description>
                  {product.description.slice(0, 80) + '...'}
                </Item.Description>
                <AddToCartButton
                  productToAdd={product}
                  productInCart={
                    lineItems.find(item => item.productId === product.id) || {}
                  }
                />
              </Item.Content>
            </Grid.Column>
          )
        })}
      </Grid>
    </div>
  )
}

export default withRouter(AllProducts)
