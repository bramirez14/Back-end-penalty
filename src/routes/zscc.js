var methodOverride = require('method-override')
var express = require('express');
var router = express.Router();
var path=require('path');
var router = express.Router();
const zsccController = require('../controller/zsccController');

router.get('/todas',zsccController.todasZSCC);
router.get('/:id',zsccController.idZSCC);


module.exports = router;