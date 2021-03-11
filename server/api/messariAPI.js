// base path: /api/messariAPI

const router = require('express').Router()
module.exports = router
const got = require('got')
const axios = require('axios')

//  HELPER FUNCTIONS ---------------------------------------------------------
const nvtScoreCalculator = nvt => {
  return Math.max(0, 1 - nvt / 150) * 100
}

const retentionScoreCalculator = turnover => {
  return turnover ? 100 - turnover : 0
}
// --------------------------------------------------------------------------------
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

    // const profileDataKey = (
    //   await axios.get(
    //     `https://data.messari.io/api/v2/assets/${coinId}/profile`,
    //     {
    //       headers: {
    //         'x-messari-api-key': `${process.env.MESSARI_API_KEY}`
    //       }
    //     }
    //   )
    // ).data

    const assetMetricsKey = (
      await axios.get(
        `https://data.messari.io/api/v1/assets/${coinId}/metrics`,
        {
          headers: {
            'x-messari-api-key': `${process.env.MESSARI_API_KEY}`
          }
        }
      )
    ).data
    const data = {...assetMetricsKey.data}
    // const filtered = {
    //   slug: data.slug,
    //   marketData: data.market_data,
    //   marketCap: data.marketcap,
    //   hashRate: data.mining_stats,
    //   avgDifficulty: data.average_difficulty,
    //   sharpeRatio: data.risk_metrics.sharpe_ratios,
    //   lendRates: data.lend_rates,
    //   onChainData: data.on_chain_data
    // }
    //console.log('data ---------------------------------------', data)
    const filtered = {
      slug: data.slug,
      nvtScore: nvtScoreCalculator(
        data.marketcap.current_marketcap_usd /
          data.market_data.real_volume_last_24_hours
      ),
      retentionScore: retentionScoreCalculator(
        data.marketcap.volume_turnover_last_24_hours_percent
      ),
      sharpeRatio: data.risk_metrics.sharpe_ratios
    }
    res.status(200).send(filtered)
  } catch (error) {
    next(error)
  }
})
router.get('/coins/:coinId/profile', async (req, res, next) => {
  try {
    const {coinId} = req.params

    const profileDataKey = (
      await axios.get(
        `https://data.messari.io/api/v2/assets/${coinId}/profile`,
        {
          headers: {
            'x-messari-api-key': `${process.env.MESSARI_API_KEY}`
          }
        }
      )
    ).data.data
    res.status(200).send(profileDataKey)
  } catch (error) {
    next(error)
  }
})
