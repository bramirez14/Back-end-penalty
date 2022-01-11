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


/****AGREGAR PEDIDO****/
router.post("/agregar/newscc", async (req, res) => {
  try {
    const pool = await getConnection();
    // aprobados
    const filtroAprobados = await pool
      .request()
      .query(
        "SELECT * FROM [WBT11_TEMP].[dbo].[Z_SCC] where APROBCRED='S' and APROBDEP='S' and  NROCOMP IS NULL"
      );
    const arrayApro = filtroAprobados.recordset.map((f) => f.CLIENTE);
    //TE DA UN ARRAY DE SOLO NUMERO DE CLIENTES
    const clientes = arrayApro.filter(function (ele, pos) {
      return arrayApro.indexOf(ele) == pos;
    });

    //el numero de pedido
    const numeroPedido = await pool
      .request()
      .query(
        "SELECT CLAVE, FUNCION FROM [WBT11_TEMP].[dbo].[TABLASI09] where CLAVE = 'SI091PD0006X'"
      );
    let date = new Date(); 

    //insertamos en la tabla PDCABEZA
 let number= numeroPedido.recordset[0].FUNCION;
console.log(number);
     for (let i = 0; i < clientes.length; i++) { 
    console.log(clientes[i],'soy cliente ');
        number++; 
    console.log(' soy number:'+ number);
    let buscarItemsClientes= filtroAprobados.recordset.filter(f=> f.CLIENTE ===clientes[i] )

      let bonif = await pool
      .request()
      .query(
        `SELECT * FROM [WBT11_TEMP].[dbo].[CLIENTES] WHERE NUMERO = '${clientes[i]}' `
      );
    let entrega = await pool
      .request()
      .query(
        `SELECT TRANSPORTE FROM [WBT11_TEMP].[dbo].[CLTESENTREGA] WHERE CLIENTE= '${clientes[i]}' `
      );
    await pool.request()
      .query(`INSERT INTO [WBT11_TEMP].[dbo].[PDCABEZA] VALUES(
'P',
${clientes[i]},
${number},
'2C',
null,
null,
${00},
${0},
'${bonif.recordset[0].DESCUENTO}',
${0},
${0},
'${bonif.recordset[0].VENDEDOR}',
'${entrega.recordset[0].TRANSPORTE}',
null,
'S',
'${bonif.recordset[0].DIRECCION}',
'L',
'L',
'01',
null,
'01',
null,
null,
null,
'${bonif.recordset[0].RAZONSOC}',
null,
null,
null,
null,
null,
null,
null,
'N',
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
${number},
'01',
null,
null,
null,
'I',
null)`); 
for (const c of buscarItemsClientes) {
  if(buscarItemsClientes.length>1){
    number++; 
  }
    await pool.request().query(`INSERT INTO [WBT11_TEMP].[dbo].[PDITEMS] 
    (TIPO,
    CLIENTE,
    NROPED,
    ITEM,
    ARTICULO,
    DESCART,
    PRESENTA,
    LISTA,
    DESCUENTO,
    DESCUENTOESP,
    PRECIO,
    CANTPED,
    BULTPED,
    CANTPEDT00,
    CANTPEDT01,
    CANTPEDT02,
    CANTPEDT03,
    CANTPEDT04,
    CANTPEDT05,
    CANTPEDT06,
    CANTPEDT07,
    CANTPEDT08,
    CANTPEDT09,
    CANTPEDT10,
    CANTPEDT11,
    CANTPEDT12,
    CANTPEDT13,
    CANTPEDT14,
    CANTFRE,
    BULTFRE,
    CANTFRET00,
    CANTFRET01,
    CANTFRET02,
    CANTFRET03,
    CANTFRET04,
    CANTFRET05,
    CANTFRET06,
    CANTFRET07,
    CANTFRET08,
    CANTFRET09,
    CANTFRET10,
    CANTFRET11,
    CANTFRET12,
    CANTFRET13,
    CANTFRET14,
    CANTFAC,
    BULTFAC,
    CANTFACT00,
    CANTFACT01,
    CANTFACT02,
    CANTFACT03,
    CANTFACT04,
    CANTFACT05,
    CANTFACT06,
    CANTFACT07,
    CANTFACT08,
    CANTFACT09,
    CANTFACT10,
    CANTFACT11,
    CANTFACT12,
    CANTFACT13,
    CANTFACT14,
    CANTREM,
    BULTREM,
    CANTREMT00,
    CANTREMT01,
    CANTREMT02,
    CANTREMT03,
    CANTREMT04,
    CANTREMT05,
    CANTREMT06,
    CANTREMT07,
    CANTREMT08,
    CANTREMT09,
    CANTREMT10,
    CANTREMT11,
    CANTREMT12,
    CANTREMT13,
    CANTREMT14,
    CANTARE,
    BULTARE,
    CANTARET00,
    CANTARET01,
    CANTARET02,
    CANTARET03,
    CANTARET04,
    CANTARET05,
    CANTARET06,
    CANTARET07,
    CANTARET08,
    CANTARET09,
    CANTARET10,
    CANTARET11,
    CANTARET12,
    CANTARET13,
    CANTARET14,
    CANTDTO,
    DEPSALIDA,
    UBICACION,
    FECRECEP,
    DESPACHO,
    CUMPLIDO,
    PARTIDA,
    FILLER,
    USRANULACION,
    FECANULACION,
    FECALTA,
    USUARIO,
    FECMOD,
    USRMOD,
    PLANIFICACION
    )
     VALUES (
     'P', 
     ${clientes[i]},
${number},
      '${001}', 
     '${c.ARTICULO}',
    null,
    '01',
    '01',
    ${0},
    ${0},
    ${c.PRECIOLIST},
'${c.CANTPED}',
'${c.CANTPED}',
'${c.CANTPEDT00}',
'${c.CANTPEDT01}',
'${c.CANTPEDT02 }',
'${c.CANTPEDT03 }',
'${c.CANTPEDT04 }',
'${c.CANTPEDT05 }',
'${c.CANTPEDT06 }',
'${c.CANTPEDT07 }',
'${c.CANTPEDT08 }',
'${c.CANTPEDT09 }',
'${c.CANTPEDT10 }',
'${c.CANTPEDT11}',
'${c.CANTPEDT12 }',
'${c.CANTPEDT13 }',
'${c.CANTPEDT14 }',
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
${0},
    'T3',
    null,
    null,
    null,
   'N',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
   'N')`); 

}

     }  
     await pool.request().query(`UPDATE [WBT11_TEMP].[dbo].[TABLASI09]  SET 
FUNCION = 000+${number}  where CLAVE = 'SI091PD0006X'`);
    res.send("ok");
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

router.get("/filtrando/aprobados", async (req, res) => {
  try {
    const pool = await getConnection();
    const filtroAprobados = await pool
      .request()
      .query(
        "SELECT * FROM [WBT11_TEMP].[dbo].[Z_SCC] where APROBCRED='S' and APROBDEP='S' and  NROCOMP IS NULL"
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
      .query("SELECT TOP 10 * FROM [WBT11_TEMP].[dbo].[PDITEMS]");
    res.send(result.recordset);
  } catch (e) {
    res.send({ msg: e, status: 400 });
  }
});
router.put('/editar/pedido',async(req,res)=>{
  try {
    const pool = await getConnection();

    await pool.request().query(`UPDATE [WBT11_TEMP].[dbo].[TABLASI09]  SET 
    FUNCION = 000600  where CLAVE = 'SI091PD0006X'`);
    res.send('ok')
  } catch (e) {
    res.send(e)
  }
  

})

module.exports = router;
