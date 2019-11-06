const router = require('express').Router()
const {Order, Session, Product, ProductsAndOrder} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/cart', async (req, res, next) => {
  try {
    const session = await Session.findOne({
      where: {
        sid: req.sessionID
      }
    })
    const whereClause = {}
    whereClause.status = 'in-cart'
    if (req.user) whereClause.userId = req.user.id
    else whereClause.SessionId = session.id
    const cart = await Order.findOrCreate({
      // where: whereClause,
      where: {id: 1},
      include: [
        {
          model: ProductsAndOrder
        },
        {
          model: Product
        }
      ]
    })
    // console.log(cart[0])
    res.json(cart[0])
  } catch (err) {
    next(err)
  }
})
