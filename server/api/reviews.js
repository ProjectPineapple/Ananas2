const router = require('express').Router()
const {Review, Product, User, Order, OrderLineItem} = require('../db/models')
module.exports = router

function requireLoggedIn(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.status(401).send('Please log in first!')
  }
}

async function requirePurchasedItem(req, res, next) {
  const {id} = req.user
  const productId = Number(req.body.productId)
  const userPaidOrderIds = await Order.findAll({
    attributes: ['id'],
    where: {userId: id, status: 'paid'}
  })

  const purchasedProducts = userPaidOrderIds.filter(async order => {
    const productsOnOrder = await OrderLineItem.findAll(order.id)
    return productsOnOrder.includes(productId)
  })

  ///NEED TO MAKE SURE WE CHANGE ORDER STATUS ON CHECKOUT
  if (purchasedProducts.includes(true)) {
    next()
  } else {
    res.status(401).send('Please only review battleships you purchased')
  }
}

// api/reviews route
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({include: [Product, User]})
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.post(
  '/',
  requireLoggedIn,
  requirePurchasedItem,
  async (req, res, next) => {
    try {
      ///NEED TO SANITIZE REVIEWS [NPM SANITIZE?]
      const {id} = req.user
      const {stars, description, photos} = req.body.review
      const productId = Number(req.body.productId)
      const review = await Review.create({stars, description, photos})
      review.setUser(id)
      review.setProduct(productId)
      res.status(200).json(review)
    } catch (err) {
      console.error(err)
    }
  }
)

//NOTE FOR POSTING REVIEWS, HAVE TO MAKE SURE USER === VALID + HAS PURCHASED PRODUCT
router.get('/ownedbyuser/:userId', requireLoggedIn, async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [Product],
      where: {userId: +req.params.userId}
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})
