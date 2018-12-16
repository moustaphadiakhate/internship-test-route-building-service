var redis = require('redis')
var config = require('./config')
var url = process.env.REDIS_URL || config.REDIS_URL || 'redis://localhost:6379'
var host = require('url').parse(url)


// fontion pour creer un client redis
function newClient() {
  var client = redis.createClient(host.port, host.hostname)
  if (host.auth) {
    client.auth(host.auth.split(":")[1])
  }
  return client
}

//instacier un client redis logger en cas d'erreur ou de succès
var client = newClient()
client.on('ready', function () {
  console.log('REDIS REUISSIT : Client connecté à Redis')
})
client.on('error', function () {
  console.log('REDIS ECHEC : Client déconnecté à Redis')
})

//fonction pour publier sur redis 
exports.publish = function (topic, data) {
  client.publish(topic, JSON.stringify(data))
}

//fonction pour subscrire un channel sur redis 
exports.subscribe = function (topic, cb) {
  var client = newClient()
  client.subscribe(topic)
  client.on('message', function (channel, message) {
    cb(JSON.parse(message))
  })
}
