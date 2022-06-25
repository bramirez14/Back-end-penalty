const express = require("express");
const router = express.Router();
const mediosPagoController = require("../controller/mediosPagoController");

router.post("/alta/medios/pagos", mediosPagoController.altaMediosPagos);
  module.exports = router;