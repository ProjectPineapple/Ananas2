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
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  cartTime: {
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

// todo: hooks for times/status

module.exports = Order
