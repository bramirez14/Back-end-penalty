var express = require('express');
var router = express.Router();
const reportesController= require('../controller/reportesController');
/* GET home page. */
router.get('/remitos',reportesController.remito);

module.exports = router;
