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
      .query("SELECT top 10 * FROM [WBT12-TEMP].[dbo].[VW_PEDIDOS]");
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
      .query("SELECT * FROM [WBT12-TEMP].[dbo].[PRUEBITA]");
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
        "SELECT CLAVE, FUNCION FROM [WBT12-TEMP].[dbo].[TABLASI09] where CLAVE = 'SI091PD0006X'"
      );
    res.send(result.recordset);
  } catch (e) {
    res.send({ msg: e, status: 400 });
  }
});

/****AGREGAR PEDIDO****/
router.post("/agregar/newscc", async (req, res) => {
  try {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let fecha;
    if (month < 10) {
      fecha = `${year}-0${month}-${day}`;
    } else {
      fecha = `${year}-${month}-${day}`;
    }
    const cantidadDeDigitos = (numero) => {
      let longNumero = numero.toString().length;
      let cantDeNumeros = 8;
      let cantNumeroRestantes = cantDeNumeros - longNumero;
      let contador = numero.toString();
      if (longNumero >= cantDeNumeros) {
        return numero;
      } else {
        for (let i = 0; i < cantNumeroRestantes; i++) {
          contador = 0 + contador;
        }
        return contador;
      }
    };
    let cantidadDeNUmeros =( digito ) => {
      let long = digito.toString().length;
      let cantnum= 3;
      let restante = cantnum - long;
      let cont = digito.toString();
      if (long >= cantnum) {
        return digito;
      } else {
        for (let i = 0; i < restante; i++) {
          cont = 0 + cont;
        }
        return cont;
      }
      
    }

    const pool = await getConnection();
    // aprobados
    const filtroAprobados = await pool
      .request()
      .query(
        "SELECT * FROM [WBT12-TEMP].[dbo].[Z_SCC] where APROBCRED='S' and APROBDEP='S' and  NROCOMP IS NULL"
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
        "SELECT CLAVE, FUNCION FROM [WBT12-TEMP].[dbo].[TABLASI09]  where CLAVE = 'SI091PD00006X' "
      );

    //insertamos en la tabla PDCABEZA
    let number = numeroPedido.recordset[0].FUNCION;
    for (let i = 0; i < clientes.length; i++) {
      number++;
      let buscarItemsClientes = filtroAprobados.recordset.filter(
        (f) => f.CLIENTE === clientes[i]
      );
      let clienteActual = await pool
        .request()
        .query(
          `SELECT * FROM [WBT12-TEMP].[dbo].[CLIENTES] WHERE NUMERO = '${clientes[i]}'`
        );
      let entrega = await pool
        .request()
        .query(
          `SELECT TRANSPORTE FROM [WBT12-TEMP].[dbo].[CLTESENTREGA] WHERE CLIENTE= '${clientes[i]}' `
        );
      let codigo = await cantidadDeDigitos(number);

      pool.request().query(`INSERT INTO [WBT12-TEMP].[dbo].[PDCABEZA] VALUES(
        'P',
        '${clientes[i]}',
        '00006${codigo}',
        '2C',
        '${fecha}', 
        '${fecha}', 
        '00',
        ${0},
        '${clienteActual.recordset[0].DESCUENTO}',
        ${0},
        ${0},
        '${clienteActual.recordset[0].VENDEDOR}',
        '${entrega.recordset[0].TRANSPORTE}',
        null,
        'S',
        '${clienteActual.recordset[0].DIRECCION}',
        'L',
        'L',
        '01',
        null,
        '01',
        null,
        null,
        null,
        '${clienteActual.recordset[0].RAZONSOC}',
        null,
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
        '${fecha}',
        '${clienteActual.recordset[0].USUARIO}',
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
        '00006${codigo}',
        '01',
        null,
        null,
        null,
        'I',
        null,
        '1',
        null)`);

      for (let j = 0; j < buscarItemsClientes.length; j++) {
      
      let digito = await cantidadDeNUmeros([j + 1]);

       await pool.request().query(`INSERT INTO [WBT12-TEMP].[dbo].[PDITEMS] 
     VALUES (
      'P', 
      '${clientes[i]}',
      '00006${codigo}',
       '${digito}', 
      '${buscarItemsClientes[j].ARTICULO}',
      null,
      '01',
      '01',
      ${0},
      ${0},
      ${buscarItemsClientes[j].PRECIO},
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
      '${buscarItemsClientes[j].CANTPED}',
      '${buscarItemsClientes[j].CANTPED}',
      '${buscarItemsClientes[j].CANTPEDT00}',
      '${buscarItemsClientes[j].CANTPEDT01}',
      '${buscarItemsClientes[j].CANTPEDT02}',
      '${buscarItemsClientes[j].CANTPEDT03}',
      '${buscarItemsClientes[j].CANTPEDT04}',
      '${buscarItemsClientes[j].CANTPEDT05}',
      '${buscarItemsClientes[j].CANTPEDT06}',
      '${buscarItemsClientes[j].CANTPEDT07}',
      '${buscarItemsClientes[j].CANTPEDT08}',
      '${buscarItemsClientes[j].CANTPEDT09}',
      '${buscarItemsClientes[j].CANTPEDT10}',
      '${buscarItemsClientes[j].CANTPEDT11}',
      '${buscarItemsClientes[j].CANTPEDT12}',
      '${buscarItemsClientes[j].CANTPEDT13}',
      '${buscarItemsClientes[j].CANTPEDT14}',
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
      '0000000001',
      '${fecha}',
      null,
      'N',
      null,
      null,
      null,
      null,
      '${fecha}',
      '${clienteActual.recordset[0].USUARIO}',
      null,
      null,
      'N')`);

      }

      for (const item of buscarItemsClientes) {
        await pool.request().query(`UPDATE [WBT12-TEMP].[dbo].[Z_SCC]  SET 
      NROCOMP='00006${codigo}'  where NROSCC=${item.NROSCC}`);
      }
    }

    await pool.request().query(`UPDATE [WBT12-TEMP].[dbo].[TABLASI09]  SET 
    FUNCION = '${number}'  where CLAVE = 'SI091PD00006X'`);
    res.send({msg:"scc comppletada",status:200});
  } catch (e) {
    res.send(e);
  }
});

router.post("/agregar/pruebita", async (req, res) => {

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(
        `INSERT INTO [WBT12-TEMP].[dbo].[PRUEBITA] VALUES ('${req.body.TIPO}','${req.body.CLIENTE}','${req.body.NROPED}',NULL,'${req.body.NUMERO}','${req.body.REAL}') `
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
        "SELECT * FROM [WBT12-TEMP].[dbo].[Z_SCC] where APROBCRED='S' and APROBDEP='S' and  NROCOMP IS NULL"
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
      .query("SELECT TOP 10 * FROM [WBT12-TEMP].[dbo].[PDITEMS]");
    res.send(result.recordset);
  } catch (e) {
    res.send({ msg: e, status: 400 });
  }
});
router.put("/editar/pedido", async (req, res) => {
  try {
    const pool = await getConnection();

    await pool.request().query(`UPDATE [WBT12-TEMP].[dbo].[TABLASI09]  SET 
    FUNCION ='000760' where CLAVE = 'SI091PD0006X'`);
    res.send("ok");
  } catch (e) {
    res.send(e);
  }
});

router.put("/editar/fecha", async (req, res) => {
  try {
    const pool = await getConnection();

    await pool.request().query(`UPDATE [WBT12-TEMP].[dbo].[PDCABEZA] SET 
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
      .query("SELECT * FROM [WBT12-TEMP].[dbo].[CLIENTES]");
    res.send(result.recordsets);
  } catch (e) {
    res.send(e);
  }
});
module.exports = router;
