const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  visible: {
    type: Sequelize.BOOLEAN
  },
  name: {
    type: Sequelize.STRING
  },
  stock: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  },
  photos: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [
      `http://www.clker.com/cliparts/9/4/0/a/12065710151188118221nicubunu_RPG_map_symbols_Shipwreck.svg.med.png`
    ]
  }
})

module.exports = Product

Product.prototype.setVisibility = () => {
  this.visible = !!this.stock
}
