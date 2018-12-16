var bodyParser = require('body-parser')
var router = require('express').Router()


router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());
router.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Resquested-With, Content-Type, Accept, Athorization');
    if (req.method ==='OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        res.status(200).json({});
    }
    next();
});
router.use('/api', require('./api'))
router.use('/', require('./static'))

module.exports = router
