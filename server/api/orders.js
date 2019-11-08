const router = require('express').Router()
const {Order, Session, Product, OrderLineItem} = require('../db/models')

module.exports = router

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
    //finding
    await Order.addItemToOrder(orderId, productId)
    const cart = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderLineItem
        },
        {
          model: Product
        }
      ]
    })
    res.json(cart)
    // if (!orderLineItemToChange) {
    //   res.sendStatus(404)
    // } else {
    //   const matchedProducts = order.filter(
    //     lineItem => lineItem.productId === productId
    //   )
    //   if (!matchedProducts.length) {
    //     const addedLineItem = await Order.addLineItem(orderId, productId)
    //     res.status(200).json(addedLineItem)
    //   } else {
    //     const productPrice = matchedProducts[0].priceAtPurchase
    //     const productUpdatedQty = matchedProducts.reduce((accum, product) => {
    //       accum += product.quantity
    //       return accum
    //     }, 1)
    //     const updatedLineItem = await Order.updateLineItem(
    //       orderId,
    //       productId,
    //       productUpdatedQty,
    //       productPrice
    //     )
    //     res.status(200).json(updatedLineItem)
    //   }
    // }
  } catch (err) {
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
