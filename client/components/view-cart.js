import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Grid, Image, Button, Container, Segment} from 'semantic-ui-react'
import {withRouter} from 'react-router'

// from https://stackoverflow.com/questions/3883342/add-commas-to-a-number-in-jquery
const commaSeparateNumber = val => {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2')
  }
  return val
}

const ViewCart = ({history, match}) => {
  const products = useSelector(state => state.viewCart.products) || []
  const orderLineItems =
    useSelector(state => state.viewCart.OrderLineItems) || []
  return products.length === 0 ? (
    <h1>Your cart is empty!</h1>
  ) : (
    <div>
      {match.path === '/cart' ? (
        <Segment padded>
          <Button onClick={() => history.push('/cart/checkout')}>
            Proceed to checkout
          </Button>
        </Segment>
      ) : null}
      <Grid padded="horizontally">
        {products.map(item => (
          <Grid.Row key={item.id}>
            <Grid.Column width={4}>
              <Image src={item.photos[0]} />
            </Grid.Column>
            <Grid.Column width={9} />
            <Grid.Column width={3}>
              <div>
                <b>{item.name}</b>
              </div>
              {item.stock > 0 ? (
                <div className="in-stock">
                  <div>Price: ${commaSeparateNumber(item.price / 100)}</div>
                  <div>
                    Qty:{' '}
                    {
                      orderLineItems.filter(
                        lineItem => lineItem.productId === item.id
                      )[0].quantity
                    }
                  </div>
                  <Button onClick={() => console.log('you clicked `edit`')}>
                    Edit
                  </Button>
                  <Button onClick={() => console.log('you clicked `remove`')}>
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="out-of-stock">
                  <div style={{color: 'red'}}>
                    Sorry, this item is out of stock.
                  </div>
                  <Button
                    onClick={() =>
                      console.log('YEAH, RIGHT! There is no wishlist yet!')
                    }
                  >
                    Add to Wishlist
                  </Button>
                  <Button onClick={() => console.log('you clicked `remove`')}>
                    Remove
                  </Button>
                </div>
              )}
            </Grid.Column>
          </Grid.Row>
        ))}
      </Grid>
    </div>
  )
}

export default withRouter(ViewCart)
