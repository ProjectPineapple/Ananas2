const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get(`/`, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        status: 'in-cart'
        // also the association between session and cart
      }
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
