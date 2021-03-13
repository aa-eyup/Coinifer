const axios = require('axios')
const router = require('express').Router()
module.exports = router

router.get('/coins/:symbol/long-term-vwap', async (req, res, next) => {
  try {
    const {symbol} = req.params
    // x day vwap
    // x day volume (fetch x+1 data points and ignore last two in array)
    const vwap = async (ticker, dayCount) => {
      const volume = (
        await axios.get(
          `https://min-api.cryptocompare.com/data/symbol/histoday?fsym=${ticker}&tsym=USD&limit=${dayCount +
            1}`
        )
      ).data.Data.map(volObj => volObj.total_volume_total)
      const typicalPrice = (
        await axios.get(
          `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${ticker}&tsym=USD&limit=${dayCount +
            1}`
        )
      ).data.Data.Data.map(
        priceObj => (priceObj.high + priceObj.low + priceObj.close) / 3
      )
      let tpv = 0
      let cumulativeVolume = 0
      for (let i = 0; i < dayCount; i++) {
        cumulativeVolume += volume[i]
        tpv += volume[i] * typicalPrice[i]
      }
      return tpv / cumulativeVolume
    }
    const responseVWAP = await vwap(symbol, 7)
    res.status(200).send({vwap: responseVWAP})
  } catch (error) {
    next(error)
  }
})
