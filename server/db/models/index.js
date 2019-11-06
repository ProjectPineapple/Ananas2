const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Review = require('./review')
const Session = require('./session')

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Product)
Product.hasMany(Review)

Order.belongsTo(User)
User.hasMany(Order)

Product.belongsToMany(Order, {through: 'ProductOrder'}) // make explicit, add columns for price at purchase
Order.belongsToMany(Product, {through: 'ProductOrder'})

Order.belongsTo(Session)

module.exports = {
  User,
  Order,
  Product,
  Review
}
