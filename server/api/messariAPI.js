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
  const data = await got.get('https://data.messari.io/api/v2/assets').json()
  res.send(data.data)
})

// v2/assets/${symbol}/profile
// v1/assets/${symbol}/metrics
// v1/assets/${symbol}/market-data
/*
const data = await got
  .get('https://data.messari.io/api/v2/assets/rvn/profile')
  .json()
*/
