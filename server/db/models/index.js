const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Review = require('./review')
const Session = require('./session')
const ProductsAndOrder = require('./ProductOrder')

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Product)
Product.hasMany(Review)

Order.belongsTo(User)
User.hasMany(Order)

Product.belongsToMany(Order, {through: ProductsAndOrder}) // make explicit, add columns for price at purchase
Order.belongsToMany(Product, {through: ProductsAndOrder})
// Order.belongsToMany(ProductsAndOrder)
// Product.belongsToMany(ProductsAndOrder)
// ProductsAndOrder.hasMany

Order.belongsTo(Session)
Session.hasOne(Order)

module.exports = {
  User,
  Order,
  Product,
  Review,
  Session,
  ProductsAndOrder
}
