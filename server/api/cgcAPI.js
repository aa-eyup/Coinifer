// base path: /api/cgcAPI

const axios = require('axios')
const CoinGecko = require('coingecko-api')
const CoinGeckoClient = new CoinGecko()

const router = require('express').Router()
module.exports = router

router.get('/coins', async (req, res, next) => {
  try {
    const data = (
      await CoinGeckoClient.coins.all({
        per_page: 100,
        localization: false
      })
    ).data
    res.status(200).send(data)
  } catch (error) {
    next(error)
  }
})

router.get('/coins/:coinId', async (req, res, next) => {
  try {
    const {coinId} = req.params
    const data = (
      await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
    ).data
    res.status(200).send(data)
  } catch (error) {
    next(error)
  }
})
