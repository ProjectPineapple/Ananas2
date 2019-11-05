const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(['created', 'processing', 'cancelled', 'completed']),
    defaultValue: 'created'
  },
  subtotal: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  orderTime: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  }
  // include Product as lineItems ({ price: (at the time!), productId, qty }) , fk: userId
})

module.exports = Order
