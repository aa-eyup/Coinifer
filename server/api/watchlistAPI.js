// base path: /api/watchlistAPI
const {isLoggedInUser} = require('./secruityMiddleware');
const router = require('express').Router();
module.exports = router;
const {Watchlist} = require('../db/models');

router.get('/users/:userId', async (req, res, next) => {
  console.log('req.user \n', req.user);
  try {
    //const {userId} = req.params
    // use sessions user.id bc on componentDidMount, user state information is not yet populated
    const userId = req.user.id;
    if (userId) {
      const assets = await Watchlist.findAll({
        attributes: ['assetName', 'assetSymbol', 'imageUrl'],
        where: {
          userId: userId
        }
      });
      res.status(200).send(assets);
    } else {
      res.sendStatus(405);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/users/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params;
    if (userId) {
      const {assetSymbol, assetName, imageUrl} = req.body;
      const [item, wasCreated] = await Watchlist.findOrCreate({
        where: {
          userId: userId,
          assetSymbol: assetSymbol,
          assetName: assetName
        },
        defaults: {
          imageUrl: imageUrl
        }
      });
      if (wasCreated) {
        res.status(201).send({id: item.id});
      } else {
        res.status(200).send({id: item.id});
      }
    } else {
      res.sendStatus(405);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/users/:userId', async (req, res, next) => {
  const {userId} = req.params;
  try {
    const {assetSymbol, assetName} = req.body;
    const item = await Watchlist.findOne({
      where: {
        userId: userId,
        assetSymbol: assetSymbol,
        assetName: assetName
      }
    });
    if (item) {
      await item.destroy();
    } else {
      res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
