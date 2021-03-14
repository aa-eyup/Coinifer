const Sequelize = require('sequelize')
const db = require('../db')

const Watchlist = db.define('watchlist', {
  userId: {
    type: Sequelize.INTEGER
  },
  assetSymbol: {
    type: Sequelize.STRING
  },
  assetName: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Watchlist
