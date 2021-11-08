var methodOverride = require('method-override')
var express = require('express');
var router = express.Router();
var path=require('path');
var router = express.Router();
const vacacionesController = require('../controller/vacacionesController');

router.get('/todas',vacacionesController.todasVacaciones);

module.exports = router;
