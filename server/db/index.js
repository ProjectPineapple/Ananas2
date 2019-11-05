const db = require('./db')

// register models
const {User, Order, Product, Review} = require('./models')

module.exports = {
  db,
  User,
  Order,
  Product,
  Review
}
