var router = require('express').Router()

router.use(require('./bus'))
router.use(require('./session'))
router.use(require('./hero'))

module.exports = router
