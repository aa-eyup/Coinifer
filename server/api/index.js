const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/nomicsAPI', require('./nomicsAPI'));
router.use('/messariAPI', require('./messariAPI'));
router.use('/cgcAPI', require('./cgcAPI'));
router.use('/cryptocompareAPI', require('./cryptocompareAPI'));
router.use('/watchlistAPI', require('./watchlistAPI'));
router.use('/neo4jAPI', require('./neo4jAPI'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
