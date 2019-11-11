const Sequelize = require('sequelize')
const db = require('../db')
const OrderLineItem = require('./OrderLineItem')
const Product = require('./product')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM([
      'in-cart',
      'payment-in-progress',
      'paid',
      'shipped',
      'delivered',
      'cancelled',
      'in-dispute',
      'completed'
    ]),
    defaultValue: 'in-cart'
  },
  subtotal: {
    type: Sequelize.INTEGER, // in cents; X0000 <--> `$X00.00`
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  total: {
    // after tax & shipping & discount code, etc
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  address: {
    // populate from user's shipping address during checkout
    type: Sequelize.STRING
  },
  cartTime: {
    // to delete
    // first item in the cart
    type: Sequelize.DATE,
    defaultValue: Date.now()
  },
  submittedTime: {
    // user submits order
    type: Sequelize.DATE
  },
  paymentTime: {
    // user's payment goes through
    type: Sequelize.DATE
  },
  cancelTime: {
    // if order is cancelled
    type: Sequelize.DATE
  },
  shipTime: {
    // when order ships
    type: Sequelize.DATE
  },
  deliveryTime: {
    // when order is delivered
    type: Sequelize.DATE
  },
  disputeTime: {
    // if order is disputed
    type: Sequelize.DATE
  },
  completedTime: {
    // when order is ALL DONE
    type: Sequelize.DATE
  },
  confirmationCode: {
    type: Sequelize.STRING
  }
})

// Adds item to cart by either creating a line item if none exists,
// or adding a quantity if one does exist
// async operation
Order.addItemToOrder = async (orderId, productId) => {
  const orderLineItemToChange = await OrderLineItem.findOne({
    where: {orderId, productId},
    include: [{model: Product}]
  })
  if (!orderLineItemToChange) {
    const product = await Product.findByPk(productId)
    if (product.stock > 0) {
      return OrderLineItem.create({
        quantity: 1,
        priceAtPurchase: product.price,
        productId,
        orderId
      })
    } else {
      throw new Error(`Not enough stock to add to cart:${product.name}`)
    }
  }
  if (orderLineItemToChange.quantity >= orderLineItemToChange.product.stock) {
    throw new Error(
      `Not enough stock to add to cart:${orderLineItemToChange.product.name}`
    )
  } else {
    return orderLineItemToChange.update({
      quantity: orderLineItemToChange.quantity + 1
    })
  }
}

//async operation
Order.removeItemFromOrder = async (orderId, productId) => {
  const orderLineItemToChange = await OrderLineItem.findOne({
    where: {orderId, productId}
  })

  if (!orderLineItemToChange) {
    throw new Error('No line item matching that cart')
  }

  if (orderLineItemToChange.quantity === 1) {
    return OrderLineItem.destroy({where: {productId, orderId}})
  } else {
    return orderLineItemToChange.update({
      quantity: orderLineItemToChange.quantity - 1
    })
  }
}

// TODO: fix :P
Order.afterUpdate(order => {
  switch (order.status) {
    case 'payment-in-progress':
      order.paymentTime = Date.now()
      break
    case 'cancelled':
      order.cancelTime = Date.now()
      break
    case 'shipped':
      order.shipTime = Date.now()
      break
    case 'delivered':
      order.deliveryTime = Date.now()
      break
    case 'completed':
      order.completedTime = Date.now()
      break
    case 'in-dispute':
      order.disputeTime = Date.now()
      break
    default:
      break
  }
})

module.exports = Order
