var methodOverride = require('method-override')
var express = require('express');
var router = express.Router();
var path=require('path');
var router = express.Router();
const zsccController = require('../controller/zsccController');

router.get('/todos/registros',zsccController.todasZSCC);
router.get('/:id',zsccController.idZSCC);
router.get('/todos/articulos',zsccController.artZSCC);// traemos col numero y codtalle

module.exports = router;