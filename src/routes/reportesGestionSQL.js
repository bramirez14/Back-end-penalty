const express = require("express");
const router = express.Router();
const reportesGestionSQLController = require("../controller/reportesGestionSQLController");

router.get("/ctacte", reportesGestionSQLController.ctacte);
router.get("/ctacte/proveedores", reportesGestionSQLController.ctacteprov);
router.get("/stock", reportesGestionSQLController.stock);
router.get("/ingresos/vendedor", reportesGestionSQLController.ingresos);
router.get("/pendientes/web", reportesGestionSQLController.pendientes);
router.get("/cliente/inhabilitado", reportesGestionSQLController.clienteInhabilitado);
router.get("/cobranza/mes", reportesGestionSQLController.cobranzawebMes);
router.get("/cobranza", reportesGestionSQLController.cobranzaweb);

module.exports = router;