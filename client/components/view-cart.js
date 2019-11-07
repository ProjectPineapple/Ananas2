import React from 'react'
import {connect} from 'react-redux'
import {Grid, Image, Button} from 'semantic-ui-react'

import {fetchCart} from '../store/viewCart.js'

const commaSeparateNumber = val => {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2')
  }
  return val
}

class ViewCart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    const products = this.props.viewCart.products || []
    const orderLineItems = this.props.viewCart.OrderLineItems || []
    const matchingProduct = orderLineItems.filter(
      lineItem => lineItem.productId === products[0].id
    )
    console.log(matchingProduct)
    return products.length === 0 ? (
      <h1>Your cart is empty!</h1>
    ) : (
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
                  <Button onClick={() => console.log('you clicked `remove`')}>
                    Remove
                  </Button>
                </div>
              )}
            </Grid.Column>
          </Grid.Row>
        ))}
      </Grid>
    )
  }
}

const mapStateToProps = ({viewCart}) => ({viewCart})

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart)
