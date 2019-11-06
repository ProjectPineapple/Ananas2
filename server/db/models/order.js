const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM([
      'in-cart',
      'payment-in-progress',
      'cancelled',
      'paid',
      'shipped',
      'delivered',
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
  }
  // include Product as lineItems ({ price: (at the time!), productId, qty }) , fk: userId
})

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
