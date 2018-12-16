var router = require('express').Router()
var pubsub = require('../../pubsub')
var jwt = require('jwt-simple')
var connection = require('../../database/db')
var config = require('../../config')

router.get("/bus", function (req, res){
    
    if (req.headers['x-auth']) {
        req.auth = jwt.decode(req.headers['x-auth'], config.JWT_SECRET)
        var query = `select * from Hero where username = "${req.auth.username}"`
        connection.query(query, function (error,rows,fields) {
            if (error){
                return res.json({
                    "error":"oups ! error",
                    "status":false,
                    "message": error
      
                })
            }
            if(rows.length > 0){
                var query = "select * from Bus"
                connection.query(query,(error,rows,fields) =>{
                    if (error){
                        return res.json({
                            "message":"oups ! error",
                            "status":false,
                            "error": error
                        })
                    }
                    if(rows.length > 0){
                        return res.json({
                            "status":true,
                            data:{
                                "users":rows
                            }
                        })
                    }else{
                        return res.json({
                            "error":"pas d'enregistrement de bus dans la base",
                            "status":false
                        })
                    }
              })         
            }else{
                return res.json({
                    "message":"desolé vous êtes pas un Hero",
                    "status":false,
                    "error": error
      
                })
            }
        })
    }
     else{ 
        return res.sendStatus(401)
    }   
});

router.post('/bus', function (req, res) {
    console.log(req.body);

    var nom = req.body.bus
    var ligne = req.body.ligne
    var depart = req.body.depart
    var points = req.body.points
    var terminus = req.body.terminus

    if (req.headers['x-auth']) {
        req.auth = jwt.decode(req.headers['x-auth'], config.JWT_SECRET)
        var query = `select * from Hero where username = "${req.auth.username}"`
        connection.query(query, function (error,rows,fields) {
            if (error){
                return res.json({
                    "error":"oups ! error",
                    "status":false,
                    "message": error
      
                })
            }
            if(rows.length > 0){
                var query = "insert into Bus (nom,ligne,depart,points,terminus) VALUES(?,?,?,?,?)"
                connection.query(query, [nom,ligne,depart,points,terminus], function (error, rows, fields) {
                    if(error){
                        return res.json({
                            "error":"echec de l'enregistrement",
                            "status":false,
                            "message": error
                        })
                    }
                    //on envoi les infos a redis dans le channel new_bus envoyons seulement le mon de la bus par exemple ;-)
                    pubsub.publish('new_bus', nom)
                    return res.json({
                            "status":true,
                            data:{
                                "message":"nouveau bus enregisté",
                                "user": {
                                    "id":rows.insertId,
                                }
                            }
                    })
                })         
            }else{
                return res.json({
                    "message":"desolé vous êtes pas un Hero",
                    "status":false,
                    "error": error
      
                })
            }
        })   
    }
     else{ 
        return res.sendStatus(401)
    } 

});

// notre système d'information pour les heros peut être lié a un channel redis par exmeple new_bus
pubsub.subscribe('new_bus', function (bus) {
  /* on met le ce que lo'on desire quand oon reçois un message de new_post de la part d'un hero utilisant un software 
  device ou systeme de l'entreprise mais conçu de la meme façon ou diférrement*/
  console.log('Redis message :' + bus)
  });


  module.exports = router
