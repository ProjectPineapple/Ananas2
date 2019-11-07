const router = require('express').Router()
const {Order, Session, Product, OrderLineItem} = require('../db/models')

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
          model: OrderLineItem
        },
        {
          model: Product
        }
      ]
    })
    res.json(cart[0])
  } catch (err) {
    next(err)
  }
})

router.put('/cart', async (req, res, next) => {
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
    const cart = await Order.findOne({
      where: whereClause
    })
    console.log(req.body)
    /*const productToAdd = await Product.findOne({
      where: { id: req.body.productId} 
    })*/

    // cart.addProducts(
  } catch (err) {
    next(err)
  }
})

router.put('/checkout', async (req, res, next) => {
  const formData = req.body.formData
  const orderId = req.body.orderId
  try {
    const response = User.findOrCreate({where: {email: formData.email}})
    console.log(response)
  } catch (error) {
    next(error)
  }
})
