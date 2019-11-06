const Sequelize = require('sequelize')
const db = require('../db')

const Session = db.define('Session', {
  sid: Sequelize.STRING,
  expires: Sequelize.DATE,
  data: Sequelize.TEXT,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
})

module.exports = Session
