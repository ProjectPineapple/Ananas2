import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Grid, Image, Button, Segment, Icon} from 'semantic-ui-react'
import {fetchCart} from '../store/viewCart'
import {withRouter} from 'react-router'
import commaSeparateNumber from '../utilityMethods'

const ViewCart = ({history, match}) => {
  const products = useSelector(state => state.viewCart.products) || []
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCart())
  }, [])

  products.map(item => {
    if (item.stock < item.OrderLineItem.quantity)
      item.OrderLineItem.quantity = item.stock
    return item
  })

  const subtotal = products
    ? products.reduce(
        (subtotalSoFar, nextItem) =>
          subtotalSoFar + nextItem.price * nextItem.OrderLineItem.quantity,
        0
      )
    : 0
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
                    <Icon
                      name="minus"
                      size="tiny"
                      color="grey"
                      link
                      onClick={() => console.log('tryna remove? hysterical')}
                    />
                    {item.OrderLineItem.quantity + ' '}
                    <Icon
                      name="plus"
                      size="small"
                      color="grey"
                      link
                      onClick={() =>
                        console.log('you wanna add? you for real??')
                      }
                    />
                  </div>
                  <Button onClick={() => console.log('TODO: dispatch thunk')}>
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="out-of-stock">
                  <div style={{color: 'red'}}>
                    {`Sorry, this item is out of stock.`}
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
        <Grid.Row>
          <h2 align="right">
            Subtotal: ${commaSeparateNumber(subtotal / 100)}
          </h2>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default withRouter(ViewCart)
