const Sequelize = require('sequelize')
const db = require('../db')

const ProductsAndOrder = db.define('ProductsAndOrder', {
  quantity: Sequelize.INTEGER,
  priceAtPurchase: Sequelize.INTEGER
})

module.exports = ProductsAndOrder
