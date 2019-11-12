const router = require('express').Router()
const {Product, Review} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

function requireLoggedIn(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.status(401).send('Please log in first!')
  }
}

function requireAdminStatus(req, res, next) {
  if (req.user.isAdmin) {
    next()
  } else {
    res.sendStatus(403)
  }
}

//pagination
const PER_PAGE = 24
router.get('/', async (req, res, next) => {
  try {
    const whereclause = {}
    const sortBy = req.query.sortBy || 'id'
    const page = req.query.page || 1
    const direction = req.query.direction || 'asc'
    if (req.query.categories) {
      whereclause.tags = {[Op.contains]: [req.query.categories]}
    }
    if (req.query.search) {
      whereclause[Op.or] = {
        name: {[Op.substring]: req.query.search},
        description: {[Op.substring]: req.query.search}
      }
    }

    const results = await Product.findAndCountAll({
      include: [Review],
      where: whereclause,
      limit: PER_PAGE,
      offset: (page - 1) * 24,
      order: [[sortBy, direction]]
    })
    res.json(results) // Object with products and total count as count
  } catch (err) {
    next(err)
  }
})

router.post(
  '/',
  requireLoggedIn,
  requireAdminStatus,
  async (req, res, next) => {
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
  }
)

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

router.put(
  '/:productId',
  requireLoggedIn,
  requireAdminStatus,
  async (req, res, next) => {
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
  }
)

router.delete(
  '/:productId',
  requireLoggedIn,
  requireAdminStatus,
  async (req, res, next) => {
    try {
      await Product.destroy({where: {id: req.params.productId}})
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
)
