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

// router.get('/:orderId', async (req, res, next) => {
//   try {
//     const order = await Order.findByPk(req.params.orderId)
//     res.json(order)
//   } catch (err) {
//     next(err)
//   }
// })

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

router.delete('/cart', async (req, res, next) => {
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
    /*const productToDelete = await Product.findOne({
       where: { id: req.body.productId}
       })*/
  } catch (err) {
    next(err)
  }
})

router.post('/cart', async (req, res, next) => {
  try {
    console.log(req.body)
    await Order.addLineItem(req.params.orderId, req.params.productId)
  } catch (error) {
    next(error)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    // const session = await Session.findOne({
    //   where: {
    //     sid: req.sessionID
    //   }
    // })

    const orderId = Number(req.params.orderId)
    const productId = Number(req.body.productId)
    const qty = 1
    const price = 100000000
    const cart = await Order.findOne({
      where: {id: orderId}
    })

    const lineItem = await Order.updateLineItem(orderId, productId, qty, price)

    console.log('lineItem in /:orderId', lineItem)
  } catch (err) {
    next(err)
  }
})

router.put('/cart', async (req, res, next) => {
  console.log(req.body)
})
