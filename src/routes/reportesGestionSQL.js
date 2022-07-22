const express = require("express");
const router = express.Router();
const reportesGestionSQLController = require("../controller/reportesGestionSQLController");

router.get("/ctacte", reportesGestionSQLController.ctacte);
router.get("/ctacte/proveedores", reportesGestionSQLController.ctacteprov);

  module.exports = router;