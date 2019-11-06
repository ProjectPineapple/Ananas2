const router = require('express').Router()
const {Product, Review} = require('../db/models')
module.exports = router

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findbyId(req.params.productId, {
      include: [Review]
    })
    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const [updatedRows, update] = await Product.update({
      name: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      photos: [req.body.photo1, req.body.photo2, req.body.photo3]
    })
    res.json(update)
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
