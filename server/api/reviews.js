const router = require('express').Router()
const {Product, Review} = require('../db/models')
// const {Op} = require('sequelize')
module.exports = router

//api/reviews route
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({include: [Product]})
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    ///NEED TO SANITIZE REVIEWS [NPM SANITIZE?]
    const {stars, description, photos} = req.body
    const productId = Number(req.body.productId)
    console.log('Req.body: ', req.body)
    //POST WORKS GENERALLY; NEED TO TEST PRODUCTID
    const newReview = await Review.create(
      {stars, description, photos},
      {
        where: {productId: productId}
      }
    )
    res.status(200).json(newReview)
  } catch (err) {
    console.error(err)
  }
})

//NOTE FOR POSTING REVIEWS, HAVE TO MAKE SURE USER === VALID + HAS PURCHASED PRODUCT
