// base path: /api/watchlistAPI
const router = require('express').Router()
module.exports = router
const {Watchlist} = require('../db/models')

router.get('/', (req, res, next) => {
  res.send('hi there')
})

router.post('/users/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params
    console.log('req.user-----------------------', req.user)
    if (userId) {
      const {assetSymbol, assetName} = req.body
      const [item, wasCreated] = await Watchlist.findOrCreate({
        where: {
          userId: userId,
          assetSymbol: assetSymbol,
          assetName: assetName
        }
      })
      if (wasCreated) {
        res.status(201).send({id: item.id})
      } else {
        res.status(200).send({id: item.id})
      }
    } else {
      res.sendStatus(405)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/users/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params
    const {assetSymbol, assetName} = req.body
    const item = await Watchlist.findOne({
      where: {
        userId: userId,
        assetSymbol: assetSymbol,
        assetName: assetName
      }
    })
    await item.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
