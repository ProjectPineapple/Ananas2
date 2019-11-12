const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')
const OrderLineItem = require('./OrderLineItem')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  status: {
    type: Sequelize.ENUM(['admin', 'user', 'guest'])
  },
  name: {
    type: Sequelize.STRING
  },
  defaultBillingAddress: {
    type: Sequelize.STRING
  },
  defaultShippingAddress: {
    type: Sequelize.STRING
  },
  addresses: {
    type: Sequelize.ARRAY(Sequelize.STRING) // how to deal with sorting?
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  facebookId: {
    type: Sequelize.STRING
  },
  sessionId: {
    type: Sequelize.STRING
  },
  verified: {
    type: Sequelize.STRING
  }
})
// indexes

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.prototype.ownsOrder = async function(orderId) {
  try {
    const userOrders = await Order.findAll({
      attributes: ['id'],
      where: {id: orderId, userId: this.id}
    })
    return userOrders.length
  } catch (err) {
    console.error(err)
  }
}

User.prototype.hasOrderedProductById = async function(productId) {
  try {
    const userPurchases = await Order.findAll({
      attributes: ['id'],
      where: {
        userId: this.id,
        status: 'paid'
      },
      include: [
        {
          model: OrderLineItem,
          where: {productId: +productId},
          required: true
        }
      ]
    })
    return userPurchases.length
  } catch (err) {
    console.error(err)
  }
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
