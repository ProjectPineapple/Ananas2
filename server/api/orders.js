const router = require('express').Router()
const {Order, Session, Product, OrderLineItem, User} = require('../db/models')
const customId = require('custom-id')

module.exports = router

//pagination GET all (for admins)
// const PER_PAGE = 10
// router.get('/', async (req, res, next) => {
//   try {
//     console.log('request query ', req.query)
//     const page = 2
//     const results = await Order.findAll({
//       include: {model: OrderLineItem, include: [{model: Product}]},
//       offset: (page - 1) * 10,
//       limit: PER_PAGE,
//       order: [['status']]
//     })
//     res.json(results)
//   } catch (err) {
//     next(err)
//   }
// })

function requireLoggedIn(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.status(401).send('Please log in first!')
  }
}

async function requireAdminStatusOrOriginator(req, res, next) {
  const orderId = Number(req.params.orderId)
  if (req.user.isAdmin || (await req.user.ownsOrder(orderId))) {
    next()
  } else {
    res.status(403).send('You can only edit your orders.')
  }
}

//Gets all orders - used for admin listing
router.get('/', async (req, res, next) => {
  // add admin validation
  try {
    const orders = await Order.findAll({
      include: {model: OrderLineItem, include: [{model: Product}]}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

const SHIPPING_PRICE = 50000
// Finds or creates a cart if no cart exists for the user
router.get('/cart', async (req, res, next) => {
  try {
    console.log('REQ SESSION ', req.session)
    console.log('REQ SESSIONID ', req.sessionID, req.sessionId)
    const session = await Session.findOne({
      where: {
        sid: req.sessionID
      }
    })

    const whereClause = {}
    whereClause.status = 'in-cart'
    if (req.user) {
      whereClause.userId = req.user.id
    } else {
      whereClause.SessionSid = req.sessionID
    }
    const [cart, cartCreated] = await Order.findOrCreate({
      where: whereClause,
      include: [
        {model: OrderLineItem, include: [{model: Product}]},
        {
          model: Product
        }
      ]
    })
    const subtotal = cart.OrderLineItems
      ? cart.OrderLineItems.reduce(
          (acc, lineItem) => acc + lineItem.priceAtPurchase * lineItem.quantity,
          0
        )
      : 0
    const shipping = SHIPPING_PRICE
    const taxes = 0.09
    const total = subtotal + shipping + Math.round(subtotal * taxes)

    await cart.update({subtotal, total})
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// Gets order by id
router.get('/:orderId', requireLoggedIn, async (req, res, next) => {
  // add validations
  try {
    const order = await Order.findByPk(+req.params.orderId, {
      include: {model: OrderLineItem, include: [{model: Product}]}
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/ownedbyuser/:userId', requireLoggedIn, async (req, res, next) => {
  //validation here as well to check userID against req.session
  try {
    const orders = await Order.findAll({
      where: {userId: +req.params.userId},
      include: {model: OrderLineItem, include: [{model: Product}]}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get(
  '/ownedbyuser/:userId/:orderId',
  requireLoggedIn,
  async (req, res, next) => {
    //validation here as well to check userID against req.session
    try {
      const orderId = +req.params.orderId
      const userId = +req.params.userId
      const order = await Order.findOne({
        where: {id: orderId, userId},
        include: {model: OrderLineItem, include: [{model: Product}]}
      })
      res.json(order)
    } catch (err) {
      next(err)
    }
  }
)

// adds Item to cart and then returns the cart
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
    const subtotal = cart.OrderLineItems.reduce(
      (acc, lineItem) => acc + lineItem.priceAtPurchase * lineItem.quantity,
      0
    )
    const shipping = SHIPPING_PRICE
    const taxes = 0.09
    const total = subtotal + shipping + Math.round(subtotal * taxes)

    await cart.update({subtotal, total})
    res.json(cart)
  } catch (err) {
    if (err.message === 'Not enough stock to add to cart') {
      res.sendStatus(409) // Conflict
    }
    next(err)
  }
})

// removes Item from cart and then returns the cart
router.put('/removeitemfromcart/', async (req, res, next) => {
  //add validation that it is indeed your cart that is being manipulated
  // compare req.session to user ID?
  try {
    const {orderId, productId} = req.body
    await Order.removeItemFromOrder(orderId, productId)
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
    const subtotal = cart.OrderLineItems.reduce(
      (acc, lineItem) => acc + lineItem.priceAtPurchase * lineItem.quantity,
      0
    )
    const shipping = SHIPPING_PRICE
    const taxes = 0.09
    const total = subtotal + shipping + Math.round(subtotal * taxes)

    await cart.update({subtotal, total})
    res.json(cart)
  } catch (err) {
    if (err.message === 'No line item matching that cart') {
      res.sendStatus(404) // Not Found
    }
    next(err)
  }
})

router.put('/removeLineItemFromCart', async (req, res, next) => {
  try {
    //again add validation that it is your cart, maybe its possible to
    // do this at the top of this file before any of them, so we can stay dry
    const {orderId, productId} = req.body
    await OrderLineItem.destroy({where: {orderId, productId}})
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
    if (err.message === 'No line item matching that cart') {
      res.sendStatus(404) // Not Found
    }
    next(err)
  }
})

// anon checkout route
router.put('/checkout', async (req, res, next) => {
  // Need to flush this out to determine exactly what its doing,
  // but also need to do a validation step here that it is indeed
  // your cart you are checking out
  const formData = req.body.formData
  const orderId = req.body.orderId
  try {
    const userOnOrder = User.findOrCreate({where: {email: formData.email}})
    const orderWithConfCode = await Order.update(
      {confirmationCode: customId({email: userOnOrder.email})},
      {returning: true, where: {id: orderId}}
    )
    res.json({orderWithConfCode, userOnOrder})
  } catch (error) {
    next(error)
  }
})

//merge cart
router.put('/mergecarts', async (req, res, next) => {
  const sessionCart = await Order.findOne({
    where: {
      status: 'in-cart',
      SessionSid: req.sessionID
    },
    include: [
      {model: OrderLineItem, include: [{model: Product}]},
      {
        model: Product
      }
    ]
  })
  let userCart
  if (req.user) {
    userCart = await Order.findOne({
      where: {
        status: 'in-cart',
        userId: req.user.id
      },
      include: [
        {model: OrderLineItem, include: [{model: Product}]},
        {
          model: Product
        }
      ]
    })
  }

  if (sessionCart.OrderLineItems.length === 0) {
    sessionCart.destroy()
    res.json(userCart)
  } else if (userCart.OrderLineItems.length === 0) {
    await sessionCart.setUser(req.user.id)
    res.json(sessionCart)
  } else {
    //case where both carts have items
    const PromiseArray = []
    for (const lineItem of sessionCart.OrderLineItems) {
      for (let i; i < lineItem.quantity; i++) {
        PromiseArray.push(Order.addItemToOrder(userCart.id, lineItem.productId))
      }
    }
    await Promise.all(PromiseArray)
    sessionCart.destroy()
    res.json(userCart)
  }
})

//JM UPDATED THIS FROM /order/:orderId
router.put(
  '/:orderId',
  requireLoggedIn,
  requireAdminStatusOrOriginator,
  async (req, res, next) => {
    try {
      const orderId = Number(req.params.orderId)
      const {order} = req.body
      const {status} = order

      if (!await Order.findByPk(orderId)) {
        res.sendStatus(404)
      } else {
        await Order.update(
          {
            status
            // status: req.params.status,
            // subtotal: req.status.subtotal,
            // address: req.params.address
          },
          {where: {id: orderId}}
        )
        const updatedOrder = await Order.findByPk(orderId)
        res.status(200).json(updatedOrder)
      }
    } catch (error) {
      next(error)
    }
  }
)
