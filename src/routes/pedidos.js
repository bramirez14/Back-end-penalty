const methodOverride = require("method-override");
const express = require("express");
const router = express.Router();
const pedidosController = require("../controller/pedidosController");

router.get("/pase-pedidos", pedidosController.pasePedidos);
  module.exports = router;