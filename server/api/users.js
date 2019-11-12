const router = require('express').Router()
const {User, Order, Review} = require('../db/models')
var formValues = require('redux-form')

module.exports = router

function requireLoggedIn(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.status(401).send('Please log in first!')
  }
}

// function requireAdminStatusOrUser(req, res, next) {
//   const userId = Number(req.params.userId)
//   console.log(req.user.id)
//   if (req.user.isAdmin || req.user.id === userId) {
//     next()
//   } else {
//     res.status(403).send('You can only edit your orders.')
//   }
// }

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

router.get('/:userId', requireLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByPk(Number(req.params.userId), {
      include: [Review, Order]
    })
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/orders', requireLoggedIn, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {userId: +req.params.userId}
    })
    res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/cart', requireLoggedIn, async (req, res, next) => {
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

router.put('/:userId', requireLoggedIn, async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    if (!await User.findByPk(userId)) {
      res.sendStatus(404)
    } else {
      console.log(formValues)
      const {status, password} = formValues
      console.log(req.body)
      await User.update(
        {
          status,
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

router.delete('/:userId', requireLoggedIn, async (req, res, next) => {
  try {
    await User.destroy({where: {id: Number(req.params.userId)}})
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
