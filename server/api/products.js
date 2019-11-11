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
const PER_PAGE = 24
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
    if (req.query.categories) {
      whereclause.tags = {[Op.contains]: [req.query.categories]}
    }
    if (req.query.search) {
      whereclause[Op.or] = {
        name: {[Op.substring]: req.query.search},
        description: {[Op.substring]: req.query.search}
      }
      // whereclause.name = {[Op.substring]: req.query.search}
      // whereclause.description = {[Op.substring]: req.query.search}
      // whereclause.name = req.query.search
    }

    const results = await Product.findAndCountAll({
      include: [Review],
      where: whereclause,
      limit: PER_PAGE,
      offset: (page - 1) * 24,
      orderBy: [['id', 'asc']]
    })
    res.json(results) // Object with products and total count as count
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {name, description, price, stock, tags, photos} = req.body
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      tags,
      photos
    })
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
      const {name, description, price, stock, tags, photos} = req.body
      await Product.update(
        {
          name,
          description,
          price,
          stock,
          tags,
          photos
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
