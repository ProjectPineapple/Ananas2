const router = require('express').Router()
const {Review, Product, User} = require('../db/models')
// const {Op} = require('sequelize')
module.exports = router

//api/reviews route
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({include: [Product, User]})
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
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
})

//NOTE FOR POSTING REVIEWS, HAVE TO MAKE SURE USER === VALID + HAS PURCHASED PRODUCT
router.get('/ownedbyuser/:userId', async (req, res, next) => {
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
