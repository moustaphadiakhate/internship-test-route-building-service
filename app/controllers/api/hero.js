var router = require('express').Router()
var bcrypt = require('bcrypt')
var jwt    = require('jwt-simple')
var pubsub = require('../../pubsub')
var connection = require('../../database/db')


router.post('/hero', function (req, res, next) {
    
  var username =  req.body.username
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    var password = hash
    var query = "insert into Hero (username,password) VALUES(?,?)"
    connection.query(query, [username, password], function (error, rows, fields) {
        if(error){
            return res.json({
                "error":"echec de l'enregistrement",
                "status":false,
                "message": error

            })
        }
        //on envoi les infos a redis dans le channel new_hero decidons d'envoyer seulement le username de notre hero ;-)
        pubsub.publish('new_hero', username)
        return res.json({
                "status":true,
                data:{
                    "message":"nouveau user enregisté",
                    "user": {
                        "id":rows.insertId,
                    }
                }
        })
    })
  })
})

// notre système d'information pour les heros peut être lié a un channel redis par exmeple new_hero
pubsub.subscribe('new_hero', function (hero) {
    /* on met le ce que lo'on desire quand oon reçois un message de new_post de la part d'un hero utilisant un software 
    device ou systeme de l'entreprise mais conçu de la meme façon ou diférrement*/
    console.log('Redis message :'+ hero)
});
  
module.exports = router
