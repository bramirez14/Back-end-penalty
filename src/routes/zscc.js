var methodOverride = require("method-override");
var express = require("express");
var router = express.Router();
var path = require("path");
var router = express.Router();
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
      .query("SELECT top 10 * FROM [WBT11_TEMP].[dbo].[VW_PEDIDOS]");
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
      .query("SELECT * FROM [WBT11_TEMP].[dbo].[PRUEBITA]");
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
        "SELECT CLAVE, FUNCION FROM [WBT11_TEMP].[dbo].[TABLASI09] where CLAVE = 'SI091PD0006X'"
      );
    res.send(result.recordset);
  } catch (e) {
    res.send({ msg: e, status: 400 });
  }
});

router.post("/agregar/newscc", async (req, res) => {
  try {

const pool = await getConnection();
// aprobados  
const filtroAprobados = await pool.request()
.query("SELECT * FROM [WBT11_TEMP].[dbo].[Z_SCC] where APROBCRED='S' and APROBDEP='S' and  NROCOMP IS NULL");
const arrayApro= filtroAprobados.recordset.map(f=>(f.CLIENTE));
//TE DA UN ARRAY DE SOLO NUMERO DE CLIENTES
const clientes = arrayApro.filter(function(ele , pos){
  return arrayApro.indexOf(ele) == pos;
});
//el numero de pedido 
const result = await pool.request()
.query(
  "SELECT CLAVE, FUNCION FROM [WBT11_TEMP].[dbo].[TABLASI09] where CLAVE = 'SI091PD0006X'"
);
let date = new Date();



//insertamos en la tabla PDCABEZA

/* for (let i = 0; i < clientes.length; i++) { */
// console.log(clientes[i],'soy cliente '); 
// BONIFICA
let  bonif = await pool.request()
.query(`SELECT * FROM [WBT11_TEMP].[dbo].[CLIENTES] WHERE NUMERO = '${clientes[2]}' `)
console.log(bonif);
  await pool.request()
.query(`INSERT INTO [WBT11_TEMP].[dbo].[PDCABEZA] VALUES(
'P',
${clientes[2]},
${000 + result.recordset[0].FUNCION+12 },
'2C',
null,
null,
${00},
${0},
${bonif.recordset[0].DESCUENTO},
${0},
${0},
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
null,
'${req.body.NROREAL}',
null,
null,
null,
null,
'${req.body.ESTADOSEG}',
null)`);
/* } */

    res.send('ok');
  } catch (e) {
    res.send(e);
  }
});

router.post("/agregar/pruebita", async (req, res) => {
  console.log(req.body);
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(
        `INSERT INTO [WBT11_TEMP].[dbo].[PRUEBITA] VALUES ('${req.body.TIPO}','${req.body.CLIENTE}','${req.body.NROPED}',NULL,'${req.body.NUMERO}','${req.body.REAL}') `
      );
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.get('/filtrando/aprobados', async( req,res)=>{try {
  const pool = await getConnection();
  const filtroAprobados = await pool.request()
  .query("SELECT * FROM [WBT11_TEMP].[dbo].[Z_SCC] where APROBCRED='S' and APROBDEP='S' and  NROCOMP IS NULL");
res.send(filtroAprobados.recordset)
} catch (e) {
  res.send(e)
}
})

router.delete('/borrar/:id', zsccController.delete)
module.exports = router;
