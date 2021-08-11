var express = require('express');
var router = express.Router();
const reportesController= require('../controller/reportesController');
/* GET home page. */
router.get('/remitos',reportesController.remito);

router.get('/remitos/pdf',reportesController.remitoPdf);
router.get('/remitos/pdf/comprobantes',reportesController.pdfComprobantes)
router.get('/remmes',reportesController.remmes);
router.get('/facturacion/mes',reportesController.facturacionmes);
router.get('/facturacion/mesgral',reportesController.mesgral);
router.get('/facturacion/anno',reportesController.anno);
router.get('/facturacion/annogral',reportesController.annogral);

router.get('/facturacion/detallada',reportesController.facturaciondetallada);

router.get('/cuentacorriente',reportesController.cuentacorriente);

router.get('/cobranza/mes',reportesController.cobranzames);
router.get('/cobranza/anno',reportesController.cobranzaanno);

router.get('/clientes/inhabilitados',reportesController.clientesinhabilitados);

router.get('/carga/pedidos',reportesController.cargapedidos);
router.get('/pendiente/detallado',reportesController.pendientedetallado)

router.get('/pendiente/agrupadocliente',reportesController.agrupadocliente);

router.get('/futuros/ingresos',reportesController.futurosingresos);

router.get('/stock',reportesController.stock);

router.get('/scc',reportesController.w_scc);


















module.exports = router;
