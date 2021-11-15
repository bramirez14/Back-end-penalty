var methodOverride = require('method-override')
var express = require('express');
var router = express.Router();
var path=require('path');
var router = express.Router();
const zsccController = require('../controller/zsccController');

router.get('/todas',zsccController.todasZSCC);
//router.get('/agenda',zsccController.sequelize);
router.get('/conexion',zsccController.conexion);



module.exports = router;