const router = require('express').Router()
const {User, Order, Review} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'status', 'name']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(Number(req.params.userId), {
      include: [Review, Order]
    })
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/orders', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {userId: +req.params.userId}
    })
    res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: +req.params.userId,
        status: 'in-cart'
      }
    })
    res.status(200).json(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    if (!await User.findByPk(userId)) {
      res.sendStatus(404)
    } else {
      const {email, name, password} = req.body
      await User.update(
        {
          email,
          name,
          password
        },
        {where: {id: userId}}
      )
      const updatedUser = await User.findByPk(userId)
      res.status(200).json(updatedUser)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    await User.destroy({where: {id: Number(req.params.userId)}})
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
