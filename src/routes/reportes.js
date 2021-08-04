var express = require('express');
var router = express.Router();
const reportesController= require('../controller/reportesController');
/* GET home page. */
router.get('/remitos',reportesController.remito);
router.get('/remitos/pdf',reportesController.remitoPdf);
router.get('/remmes',reportesController.remmes);
router.get('/facturacion/mes',reportesController.facturacionmes);
router.get('/facturacion/mesgral',reportesController.mesgral);
router.get('/facturacion/anno',reportesController.anno);
/*router.get('/facturacion/annogral'.reportesController.annogral);
router.get('remitado'.reportesController.remitado); */



module.exports = router;
