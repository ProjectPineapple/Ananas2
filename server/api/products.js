const router = require('express').Router()
const {Product, Review} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

// //api/products route
// router.get('/', async (req, res, next) => {
//   try {
//     const products = await Product.findAll()
//     console.log('Got to Route')
//     res.json(products)
//   } catch (err) {
//     next(err)
//   }
// })

//pagination
const PER_PAGE = 10
router.get('/', async (req, res, next) => {
  try {
    // req.query example
    // {
    //   page:4,
    //   category:"russian",
    //   searchParameters:"byName",
    //   searchValue: "Roma",
    //   orderBy: "id" or "price" or "number of reviews"
    //   direction: "asc" or "desc"
    // }
    const whereclause = {}
    const page = req.query.page || 1
    if (req.query.category) {
      whereclause.category = req.query.category
    }
    if (req.query.search) {
      whereclause.name = {[Op.substring]: req.query.search}
      // whereclause.name = req.query.search
    }
    console.log('WhereClause', whereclause)
    const products = await Product.findAll({
      where: whereclause,
      limit: PER_PAGE,
      offset: (page - 1) * 25,
      orderBy: [['id', 'asc']]
    })
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
      photos: req.body.photos
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

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(Number(req.params.productId), {
      include: [Review]
    })
    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const productId = Number(req.params.productId)
    if (!await Product.findByPk(productId, {include: [Review]})) {
      res.sendStatus(404)
    } else {
      await Product.update(
        {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          stock: req.body.stock,
          tags: req.body.tags,
          photos: req.body.photos
        },
        {where: {id: productId}}
      )
      const updatedProduct = await Product.findbyPk(productId)
      res.status(200).json(updatedProduct)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    await Product.destroy({where: {id: req.params.productId}})
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
