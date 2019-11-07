const Sequelize = require('sequelize')
const db = require('../db')

const OrderLineItem = db.define('OrderLineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  priceAtPurchase: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = OrderLineItem
