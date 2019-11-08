const router = require('express').Router()
const {Product, Review} = require('../db/models')
// const {Op} = require('sequelize')
module.exports = router

//api/reviews route
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll()
    console.log('Got to Route')
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

//NOTE FOR POSTING REVIEWS, HAVE TO MAKE SURE USER === VALID + HAS PURCHASED PRODUCT
