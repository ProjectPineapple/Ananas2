const router = require('express').Router()
const {User} = require('../db/models')
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
