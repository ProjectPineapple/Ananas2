import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Grid, Image, Button, Segment, Icon, Header} from 'semantic-ui-react'
import {
  fetchCart,
  removeFromCart,
  removeLineItem,
  addToCart
} from '../store/viewCart'
import {withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import {centsToPrice, getActualQuantity} from '../utilityMethods'

const ViewCart = ({history, match}) => {
  const cart = useSelector(state => state.viewCart)
  let lineItems = cart.OrderLineItems
    ? cart.OrderLineItems.sort((a, b) => a.productId - b.productId)
    : []
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCart())
  }, [])

  const subtotal = cart.subtotal
  const total = cart.total

  return lineItems.length ? (
    <div>
      {match.path === '/cart' || match.path === '/home' ? (
        <Segment padded>
          <Button onClick={() => history.push('/cart/checkout')}>
            Proceed to checkout
          </Button>
        </Segment>
      ) : null}
      <Grid padded="horizontally">
        {lineItems.map(item => (
          <Grid.Row key={item.product.id}>
            <Grid.Column width={4}>
              <Image src={item.product.photos[0]} size="small" />
            </Grid.Column>
            <Grid.Column width={9} />
            <Grid.Column width={3}>
              <div>
                <b>{item.product.name}</b>
              </div>
              {item.product.stock > 0 ? (
                <div className="in-stock">
                  <div>Price: {centsToPrice(item.priceAtPurchase)}</div>
                  <div>{item.product.stock} remaining</div>
                  <div>
                    Qty:{' '}
                    <Icon
                      name="minus"
                      size="tiny"
                      color="grey"
                      link
                      onClick={() => {
                        dispatch(removeFromCart(item.productId, item.orderId))
                      }}
                    />
                    {item.quantity + ' '}
                    <Icon
                      name="plus"
                      size="small"
                      color="grey"
                      link
                      onClick={() => {
                        dispatch(addToCart(item.productId, item.orderId))
                      }}
                    />
                  </div>
                  <Button
                    onClick={() =>
                      dispatch(removeLineItem(item.productId, item.orderId))
                    }
                  >
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
                  <Button
                    onClick={() =>
                      dispatch(removeLineItem(item.productId, item.orderId))
                    }
                  >
                    Remove
                  </Button>
                </div>
              )}
            </Grid.Column>
          </Grid.Row>
        ))}
        <Grid.Row>
          <h2 align="right">Subtotal: {centsToPrice(subtotal)}</h2>
        </Grid.Row>
        <Grid.Row>
          <h2 align="right">Total: {centsToPrice(total)}</h2>
        </Grid.Row>
      </Grid>
    </div>
  ) : (
    <Segment placeholder>
      <Header icon>
        <Icon name="ship" />
        Your cart is empty! <NavLink to="/products">Let's fix that.</NavLink>
      </Header>
    </Segment>
  )
}

//export default withRouter(ViewCart)
export default ViewCart
