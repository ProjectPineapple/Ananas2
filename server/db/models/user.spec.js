/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index.js')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('Making a new user', () => {
    it('allows only an email', async () => {
      const dummyCody = {id: 1, email: 'cody@puppybook.com'}
      const dbCody = User.create({
        email: 'cody@puppybook.com'
      })
      expect(User.findByPk(1).id).to.be.equal(dummyCody.id)
    })
  })
}) // end describe('User model')
