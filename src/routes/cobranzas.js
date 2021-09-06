var express = require('express');
var router = express.Router();
const cobranzasController = require('../controller/cobranzasController');


router.get('/recibos',cobranzasController.recibo);

module.exports = router;