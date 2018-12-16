var express = require('express')
var path = require('path')
var router  = express.Router()

router.use('/assets', express.static(__dirname + '/../assets'))
router.use('/ng', express.static(__dirname + '/../ng'))

router.get('/', function (req, res) {

  res.sendFile(path.join(__dirname + '/../views/app.html'))
})

module.exports = router
