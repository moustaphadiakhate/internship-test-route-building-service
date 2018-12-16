var router = require('express').Router()
var bcrypt = require('bcrypt')
var jwt    = require('jwt-simple')
var config = require('../../config')
var connection = require('../../database/db')


router.post("/session", function (req, res){

  var username = req.body.username
  var password= req.body.password
  var query = `select * from Hero where username = "${username}"`
  connection.query(query, function (error,rows,fields) {
      if (error){
          return res.json({
              "error":"oups ! error",
              "status":false,
              "message": error

          })
      }
      if(rows.length > 0){
            var token = jwt.encode({username: username, password: password}, config.JWT_SECRET)
            console.log(token);
            res.send(token)         
      }else{
          return res.json({
              "message":"pas de hero trouvé",
              "status":false,
              "error": error

          })
      }
  })
});

module.exports = router
