var express    = require('express')
var logger     = require('morgan')
var config = require('./config')


var app = express()
app.use(logger('dev'))
app.use(require('./controllers'))

var server = app.listen(process.env.PORT ||config.PORT || 3000, function () {
  console.log('REUISSIT : Le server des heros de sunubus au port %d', server.address().port)
})
