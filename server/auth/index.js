const router = require('express').Router()
const User = require('../db/models/user')
const mailgun = require('mailgun-js')
const DOMAIN = 'sandbox2537cb8f20d646fcbae6c63188317d55.mailgun.org'
require('../../secrets')
const verificationEmailTemplate = require('./verificationEmailTemplate')
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN})
const faker = require('faker')

module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if (!user) {
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(password)) {
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const {email, password} = req.body
    const user = await User.create({email, password})
    const verificationCode = faker.random.uuid()
    req.login(user, err => {
      if (err) {
        next(err)
      } else {
        user.update({verified: verificationCode})
        const verificationEmail = {
          from: 'Battleship Provider <no_reply@seaBayUpcycledShips.com>',
          to: `${email}`,
          subject: 'Verify your battleshipment account',
          text: `verify your email at https://seabayarmstrading.herokuapp.com/verify?email=${email}&code=${verificationCode}`,
          html: verificationEmailTemplate(email, verificationCode)
        }
        mg.messages().send(verificationEmail, function(error, body) {
          if (error) {
            console.error(error)
          }
          console.log(body)
        })
        res.json(user)
      }
    })
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.put('/verify', async (req, res, next) => {
  try {
    const {email, code} = req.body
    const user = await User.findOne({where: {email}})
    if (user.verified === code) {
      await user.update({verified: 'true'})
      res.json('verified')
    } else {
      res.json('failed to verify')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/logout', async (req, res) => {
  await req.logout()
  console.log('DESTROY', await req.session.destroy())
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
