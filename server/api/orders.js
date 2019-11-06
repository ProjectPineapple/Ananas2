const router = require('express').Router()
const {Order} = require('../db/models')
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
    console.log(req.sessionID)
    const whereClause = {}
    whereClause.status = 'in-cart'
    if (req.user) whereClause.userId = req.user.id
    else whereClause.SessionId = req.sessionID || null
    const cart = await Order.findOrCreate({
      where: whereClause
    })
    res.json(cart[0])
  } catch (err) {
    next(err)
  }
})
