const router = require('express').Router()
module.exports = router
const axios = require('axios')
const got = require('got')

// v2/assets ------------------------------------------------------------
/*
[
'Bitcoin',         'Ethereum',
'Cardano',         'Tether',
'BNB',             'Polkadot',
'XRP',             'Litecoin',
'Chainlink',       'Bitcoin Cash',
'USD Coin',        'Stellar',
'Uniswap',         'Dogecoin',
'Wrapped Bitcoin', 'NEM',
'Aave',            'Monero',
'Cosmos',          'Solana'
]
*/
router.get('/', async (req, res, next) => {
  try {
    const data = await got.get('https://data.messari.io/api/v2/assets').json()
    res.status(200).send(data.data)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const profileData = await got
      .get(`https://data.messari.io/api/v2/assets/${id}/profile`)
      .json()

    // assetMetrics inclused .market_data
    const assetMetrics = await got
      .get(`https://data.messari.io/api/v1/assets/${id}/metrics`)
      .json()

    res.status(200).send(assetMetrics.data)
  } catch (error) {
    next(error)
  }
})
