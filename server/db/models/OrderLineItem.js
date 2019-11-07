const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const OrderLineItems = db.define('OrderLineItems', {
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

// WIP but trying to set fields in LIne Items table after create

module.exports = OrderLineItems
