const express = require("express");
const router = express.Router();
const mediosPagoController = require("../controller/mediosPagoController");

router.post("/medios/pagos", mediosPagoController.altaMediosPagos);
  module.exports = router;