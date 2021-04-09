// base: /api/nomicsAPI
const axios = require('axios');
const router = require('express').Router();
module.exports = router;

router.use('/', async (req, res, next) => {
  const data = await axios.get(
    `https://api.nomics.com/v1/market-cap/history?key=${process.env.NOMICS_API_KEY}&start=2018-04-14T00%3A00%3A00Z&end=2018-05-14T00%3A00%3A00Z`
  );
  console.log(data);
  res.send(data.data);
});
