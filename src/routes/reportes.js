var express = require('express');
var router = express.Router();
const reportesController= require('../controller/reportesController');
/* GET home page. */
router.get('/remitos',reportesController.remito);
router.get('/remitos/pdf',reportesController.remitoPdf)


module.exports = router;
