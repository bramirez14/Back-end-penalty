const express = require("express");
const router = express.Router();
const reportesGestionSQLController = require("../controller/reportesGestionSQLController");

router.get("/ctacte", reportesGestionSQLController.ctacte);
  module.exports = router;