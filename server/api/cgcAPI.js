// base path: /api/cgcAPI

const axios = require('axios');
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const router = require('express').Router();
module.exports = router;

// CGC ---------------------------------------------------------------------
// top 100
router.get('/coins', async (req, res, next) => {
  try {
    const data = (
      await CoinGeckoClient.coins.all({
        per_page: 100,
        localization: false
      })
    ).data;
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});
// top 100 by page
router.get('/coins/page/:pageNumber', async (req, res, next) => {
  try {
    const {pageNumber} = req.params;
    if (pageNumber > 0 && pageNumber <= 10) {
      const data = (
        await CoinGeckoClient.coins.all({
          per_page: 10,
          page: pageNumber,
          localization: false
        })
      ).data;
      const filtered = data.map(asset => ({
        id: asset.id,
        symbol: asset.symbol,
        name: asset.name,
        image: asset.image
      }));
      res.status(200).send(filtered);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});
// trending
router.get('/trending', async (req, res, next) => {
  try {
    const data = (
      await axios.get('https://api.coingecko.com/api/v3/search/trending')
    ).data;
    const coins = data.coins.slice(0, 6).map(coin => coin.item);
    res.status(200).send(coins);
  } catch (error) {
    next(error);
  }
});
// single
router.get('/coins/:coinId', async (req, res, next) => {
  try {
    const {coinId} = req.params;
    const data = (
      await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
    ).data;
    const filtered = {
      currentPrice: data.market_data.current_price.usd,
      cgScore: data.coingecko_score,
      developerScore: data.developer_score,
      communityScore: data.community_score,
      liquidityScore: data.liquidity_score
    };
    res.status(200).send(filtered);
  } catch (error) {
    next(error);
  }
});
