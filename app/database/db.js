var mySql = require('mysql')
var config = require('../config')


var connection = mySql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    database: config.DB_NAME
})

//ceer une connection et logger en cas d'erreur ou de succès
connection.connect(function(err){
    if (err) {
        console.error('DATABASE ECHEC : '+err)
    	return;
	}else{
		console.log('DATABASE REUISSIT : App connecté a la database sunubus dev test !')}
});

module.exports = connection
