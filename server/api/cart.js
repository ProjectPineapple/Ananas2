const router = require('express').Router()
const {Order, Session, Product, OrderLineItem} = require('../db/models')

module.exports = router

router.put('/', async (req, res, next) => {
  console.log(req.body)
  const lineItemToChange = req.body.product
  const operation = req.body.op

  const session = await Session.findOne({
    where: {
      sid: req.sessionID
    }
  })
  if (operation === 'inc') {
    console.log('gonna increment')
  } else if (operation === 'dec') {
    console.log('gonna decrement')
  } else res.status(404).json(req.body.product)
})
