const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Review = require('./review')

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Product)
Product.hasMany(Review)

Order.belongsTo(User)
User.hasMany(Order)

Product.belongsToMany(Order, {through: 'ProductOrder'})
Order.belongsToMany(Product, {through: 'ProductOrder'})

module.exports = {
  User,
  Order,
  Product,
  Review
}
