const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/nomicsAPI', require('./nomicsAPI'))
router.use('/messariAPI', require('./messariAPI'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
