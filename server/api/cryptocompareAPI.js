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
          `https://min-api.cryptocompare.com/data/symbol/histoday?fsym=${ticker}&tsym=USD&limit=${dayCount}`
        )
      ).data.Data.map(volObj => volObj.total_volume_total)
      const typicalPrice = (
        await axios.get(
          `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${ticker}&tsym=USD&limit=${dayCount}`
        )
      ).data.Data.Data.map(
        priceObj => (priceObj.high + priceObj.low + priceObj.close) / 3
      )
      let tpv = 0
      let cumulativeVolume = 0
      for (let i = 1; i <= dayCount; i++) {
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

router.get('/coins/:symbol/nvt', async (req, res, next) => {
  try {
    const {symbol} = req.params

    const data = (
      await axios.get(
        `https://min-api.cryptocompare.com/data/blockchain/histo/day?limit=91&fsym=${symbol}`,
        {
          headers: {
            authorization: `Apikey ${process.env.CRYPTOCOMPARE_API_KEY}`
          }
        }
      )
    ).data.Data.Data
    // const priceData = (
    //   await axios.get(
    //     `https://min-api.cryptocompare.com/data/v2/histoday?tsym=USD&limit=91&fsym=${symbol}`
    //   )
    // ).data.Data.Data.slice(0, 90)
    if (data && data.length > 0) {
      const nvt =
        data.reduce(
          (acc, day) =>
            acc +
            day.current_supply /
              (day.transaction_count * day.average_transaction_value),
          0
        ) / data.length

      //res.status(200).send({data, priceData})
      res.status(200).send({nvt: nvt})
    } else {
      res.status(200).send({nvt: null})
    }
  } catch (error) {
    next(error)
  }
})
