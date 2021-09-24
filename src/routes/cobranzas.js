var express = require('express');
var router = express.Router();
const cobranzasController = require('../controller/cobranzasController');


router.get('/recibos',cobranzasController.recibo);
router.post('/recibos',cobranzasController.postRecibo)
router.get('/ingresos/recibos',cobranzasController.todosRecibos);
router.get('/detalle/recibo/:id',cobranzasController.detalleRecibo);
router.put('/recibo/comprobante/:id',cobranzasController.reciboComprobante);






module.exports = router;