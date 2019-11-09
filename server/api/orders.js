const router = require('express').Router()
const {Order, Session, Product, OrderLineItem} = require('../db/models')

module.exports = router

//Gets all orders - used for admin listing
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: {model: OrderLineItem, include: [{model: Product}]}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// Finds or creates a cart if no cart exists for the user
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
      where: whereClause,
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

router.get('/ownedbyuser/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {userId: req.params.userId},
      include: {model: OrderLineItem, include: [{model: Product}]}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// router.post('/cart', async (req, res, next) => {
//   try {
//     console.log(req.body)
//     await Order.addLineItem(req.params.orderId, req.params.productId)
//   } catch (error) {
//     next(error)
//   }
// })

router.put('/additemtocart/:orderId', async (req, res, next) => {
  try {
    // add validation for user/session (pass in Authorization middleware)
    const orderId = Number(req.params.orderId)
    const productId = req.body.productId
    await Order.addItemToOrder(orderId, productId)
    const cart = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderLineItem,
          include: [{model: Product}]
        },
        {
          model: Product
        }
      ]
    })
    res.json(cart)
  } catch (err) {
    if (err.message === 'Not enough stock to add to cart') {
      res.status(409) // Conflict
    }
    next(err)
  }
})

// router.delete('/cart', async (req, res, next) => {
//   try {
//     const session = await Session.findOne({
//       where: {
//         sid: req.sessionID
//       }
//     })
//     const whereClause = {}
//     whereClause.status = 'in-cart'
//     if (req.user) whereClause.userId = req.user.id
//     else whereClause.SessionId = session.id
//     const cart = await Order.findOne({
//       where: whereClause
//     })
//     console.log(req.body)
//     /*const productToDelete = await Product.findOne({
//        where: { id: req.body.productId}
//        })*/
//   } catch (err) {
//     next(err)
//   }
// })

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
router.put('/cart', async (req, res, next) => {
  console.log(req.body)
})
