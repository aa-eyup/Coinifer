// base path: /api/messariAPI

const router = require('express').Router()
module.exports = router
const got = require('got')
const axios = require('axios')

//  HELPER FUNCTIONS ---------------------------------------------------------
const nvtTransformation = nvt => {
  if (nvt) {
    return Math.max(0, 1 - nvt / 150) * 100
  } else {
    return 0
  }
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
    const end = Date.now()
    const start = end - 604800000
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
    const responseNVT = (
      await axios.get(
        `https://data.messari.io/api/v1/assets/${coinId}/metrics/nvt-adj/time-series?start=${start}&end=${end}&interval=1d`,
        {
          headers: {
            'x-messari-api-key': `${process.env.MESSARI_API_KEY}`
          }
        }
      )
    ).data.data.values

    const maNVT = responseNVT
      ? responseNVT.reduce((acc, arr) => acc + arr[1], 0) / responseNVT.length
      : null
    const data = {...assetMetricsKey.data, maNVT}
    const filtered = {
      slug: data.slug,
      nvtScore: nvtTransformation(data.maNVT),
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
    // const filtered = {
    //   symbol: profileDataKey.symbol,
    //   contributors: profileDataKey.profile.contributors.organizations.map(
    //     org => org.name
    //   ),
    //   investors: profileDataKey.profile.investors.organizations.map(
    //     inv => inv.name
    //   ),
    //   ecosystem: profileDataKey.profile.ecosystem
    // }
    res.status(200).send(profileDataKey)
  } catch (error) {
    next(error)
  }
})
