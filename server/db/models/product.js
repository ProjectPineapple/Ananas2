const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  visible: {
    type: Sequelize.BOOLEAN
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  },
  stock: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    defaultValue: 0
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  price: {
    type: Sequelize.FLOAT(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  photos: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [
      `http://www.clker.com/cliparts/9/4/0/a/12065710151188118221nicubunu_RPG_map_symbols_Shipwreck.svg.med.png`
    ]
  }
  // include: Review, Order
})

module.exports = Product

Product.prototype.setVisibility = () => {
  this.visible = Boolean(this.stock)
}
