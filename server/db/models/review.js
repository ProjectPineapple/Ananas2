const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  stars: {
    type: Sequelize.DECIMAL(10, 2)
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 1000]
    }
  },
  photos: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  }
  // foreign keys: userId, productId
})

module.exports = Review
