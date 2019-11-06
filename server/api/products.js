const router = require('express').Router()
const {Product, Order, Review} = require('../db/models')
const {Op} = require('sequelize')

//NOTE: ADD BELOW TO API/INDEX.JS
//router.use('/products', require('./products'))

//NOTE: WILL ADD PAGINATION LATER

//api/products route
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      stock: req.body.stock,
      tags: req.body.tags,
      price: req.body.price,
      photos: [req.body.photo1, req.body.photo2, req.body.photo3]
    })
    // //ASSOCIATION PRODUCT-ORDER
    // //PROB MOVE TO API/ORDERS +/- API/USERS
    // if (req.body.orders !== undefined) {
    //   const orderIds = req.body.orders.map(order => Number(order.id))

    //   //find orders containing the product
    //   const ordered = await Order.findAll({
    //     where: {id: {[Op.in]: orderIds}}
    //   })

    //   //add to product instance
    //   product.addOrders(ordered)
    // }

    //ASSOCIATION PRODUCT-REVIEW
    //DONT THINK WILL BE ADDING REVIEW TO NEWLY CREATED PRODUCT
    // if (req.body.reviews !== undefined) {
    //   const reviewIds = req.body.reviews.map(review => Number(review.id))

    //   const productReviews = await Review.findAll({
    //     where: {id: {[Op.in]: reviewIds}}
    //   })

    //   product.addReviews(productReviews)
    // }

    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
})

module.exports = router
