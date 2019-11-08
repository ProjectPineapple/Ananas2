const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Review = require('./review')
const Session = require('./session')
const OrderLineItem = require('./OrderLineItem')

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Product)
Product.hasMany(Review)

Order.belongsTo(User)
User.hasMany(Order)

Product.belongsToMany(Order, {through: OrderLineItem}) // make explicit, add columns for price at purchase
Order.belongsToMany(Product, {through: OrderLineItem})

Order.hasMany(OrderLineItem)
OrderLineItem.belongsTo(Order)
Product.hasMany(OrderLineItem)
OrderLineItem.belongsTo(Product)

Order.belongsTo(Session)
Session.hasOne(Order)

module.exports = {
  User,
  Order,
  Product,
  Review,
  Session,
  OrderLineItem
}
