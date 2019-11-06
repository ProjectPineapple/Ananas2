const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get(`/`, async (req, res, next) => {
  // /api/cart
  try {
    // validate the current session email or session id
    console.log('request session: ', req.session)
    const whereClause = {}
    whereClause.status = 'in-cart'
    whereClause.userId = req.user ? req.user.id : null
    whereClause.sessionId = req.sessionID ? req.sessionID : null
    // whereClause.sessionId = ????
    const cart = await Order.findOne({
      where: whereClause
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
