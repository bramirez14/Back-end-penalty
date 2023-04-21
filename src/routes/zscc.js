var methodOverride = require("method-override");
var express = require("express");
var router = express.Router();
var path = require("path");
var router = express.Router();
require('dotenv').config();
const TABLE =process.env.TABLE
const zsccController = require("../controller/zsccController");
const { getConnection } = require("../sql/conexion");
router.get("/todos/registros", zsccController.todasZSCC);
router.get("/:id", zsccController.idZSCC);
router.get("/todos/articulos", zsccController.artZSCC); // traemos col numero y codtalle
router.get("/todos/talles", zsccController.talleZSCC); // traemos las curva de talles
router.put("/:id", zsccController.editZSCC); // editamos un scc
router.get("/todos/pdcabeza", zsccController.pdcabeza);

router.get("/registros/aprobados", zsccController.raproZSCC);
router.get("/todos/pedidos", async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query("SELECT top 10 * FROM [WBT12].[dbo].[VW_PEDIDOS]");
    res.send(result.recordset);
  } catch (e) {
    res.send({ msg: e, status: 400 });
  }
});
router.get("/todos/pruebit", async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query("SELECT * FROM [WBT12].[dbo].[PRUEBITA]");
    res.send(result.recordset);
  } catch (e) {
    res.send({ msg: e, status: 400 });
  }
});
router.get("/numero/si09", async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(
        "SELECT CLAVE, FUNCION FROM [WBT12].[dbo].[TABLASI09] where CLAVE = 'SI091PD0006X'"
      );
    res.send(result.recordset);
  } catch (e) {
    res.send({ msg: e, status: 400 });
  }
});

/****AGREGAR PEDIDO****/
router.post("/agregar/newscc",zsccController.newSCC)

router.post("/agregar/pruebita", async (req, res) => {

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(
        `INSERT INTO [WBT12].[dbo].[PRUEBITA] VALUES ('${req.body.TIPO}','${req.body.CLIENTE}','${req.body.NROPED}',NULL,'${req.body.NUMERO}','${req.body.REAL}') `
      );
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.get("/filtrando/aprobados", async (req, res) => {
  try {
    const pool = await getConnection();
    const filtroAprobados = await pool
      .request()
      .query(
        "SELECT * FROM [WBT12].[dbo].[Z_SCC] where APROBCRED='S' and APROBDEP='S' and  NROCOMP IS NULL"
      );
    res.send(filtroAprobados.recordset);
  } catch (e) {
    res.send(e);
  }
});
router.delete("/borrar/:id", zsccController.delete);

router.get("/todos/items", async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query("SELECT TOP 10 * FROM [WBT12].[dbo].[PDITEMS]");
    res.send(result.recordset);
  } catch (e) {
    res.send({ msg: e, status: 400 });
  }
});
router.put("/editar/pedido", async (req, res) => {
  try {
    const pool = await getConnection();

    await pool.request().query(`UPDATE [WBT12].[dbo].[TABLASI09]  SET 
    FUNCION ='000760' where CLAVE = 'SI091PD0006X'`);
    res.send("ok");
  } catch (e) {
    res.send(e);
  }
});

router.put("/editar/fecha", async (req, res) => {
  try {
    const pool = await getConnection();

    await pool.request().query(`UPDATE [WBT12].[dbo].[PDCABEZA] SET 
    FECRECEP= '2022-01-17'  WHERE NROPED ='705' `);
    res.send("fecha edita");
  } catch (e) {
    res.send(e);
  }
});
router.get("/todos/clientes", async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .query("SELECT * FROM [WBT12].[dbo].[CLIENTES]");
    res.send(result.recordsets);
  } catch (e) {
    res.send(e);
  }
});
module.exports = router;
