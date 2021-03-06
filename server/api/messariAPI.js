const router = require('express').Router()
module.exports = router
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

router.get('/coins/:coinId', async (req, res, next) => {
  try {
    const {coinId} = req.params
    const profileData = (
      await got
        .get(`https://data.messari.io/api/v2/assets/${coinId}/profile`)
        .json()
    ).data
    // assetMetrics inclused .market_data
    const assetMetrics = (
      await got
        .get(`https://data.messari.io/api/v1/assets/${coinId}/metrics`)
        .json()
    ).data
    const data = {...profileData, ...assetMetrics}
    res.status(200).send(data)
  } catch (error) {
    next(error)
  }
})
