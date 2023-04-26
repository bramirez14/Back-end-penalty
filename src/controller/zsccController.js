const { getConnection } = require("../sql/conexion");
require('dotenv').config();
const TABLE =process.env.TABLE
const zsccController = {
  todasZSCC: async (req, res) => {
    try {
      const pool = await getConnection();

      const result = await pool
        .request()
        .query(`SELECT * FROM ${TABLE}.[SCCvista]`);
      res.send(result.recordsets);
    } catch (e) {
      res.send(e);
    }
  },

  idZSCC: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await getConnection();
      const result = await pool
        .request()
        .query(
          `SELECT * FROM  ${TABLE}.[Z_SCC]  Where NROSCC = ${id}`
        );
      if (result.rowsAffected[0] === 0) return res.send(404);
      return res.send(result.recordset);
    } catch (e) {
      res.send(e);
    }
  },
  artZSCC: async (req, res) => {
    try {
      const pool = await getConnection();

      const result = await pool
        .request()
        .query(
          `SELECT NUMERO,CODTALLE,DESCRIP FROM ${TABLE}.[ARTICULO]`
        );

      res.send(result.recordsets);
    } catch (e) {
      res.send(e);
    }
  },
  talleZSCC: async (req, res) => {
    try {
      const pool = await getConnection();

      const result = await pool
        .request()
        .query(`SELECT * FROM ${TABLE}.[VW_TALLES]`);

      res.send(result.recordsets);
    } catch (e) {
      res.send(e);
    }
  },
  editZSCC: async (req, res) => {
    const { id } = req.params;
    try {
      const pool = await getConnection();
      await pool.request().query(`UPDATE ${TABLE}.[Z_SCC] SET 
        CANTPED=${req.body.CANTPED}, 
        PRECIO=${req.body.PRECIO},
        COMENTARIO='${req.body.COMENTARIO}',
        CANTPEDT00=${req.body.CANTPEDT00}, 
        CANTPEDT01= ${req.body.CANTPEDT01},
        CANTPEDT02= ${req.body.CANTPEDT02},
        CANTPEDT03= ${req.body.CANTPEDT03},
        CANTPEDT04= ${req.body.CANTPEDT04},
        CANTPEDT05= ${req.body.CANTPEDT05},
        CANTPEDT06=${req.body.CANTPEDT06},
        CANTPEDT07=${req.body.CANTPEDT07},
        CANTPEDT08=${req.body.CANTPEDT08},
        CANTPEDT09=${req.body.CANTPEDT09},
        CANTPEDT10=${req.body.CANTPEDT10},
        CANTPEDT11=${req.body.CANTPEDT11},
        CANTPEDT12=${req.body.CANTPEDT12},
        CANTPEDT13=${req.body.CANTPEDT13},
        CANTPEDT14=${req.body.CANTPEDT14},
        APROBDEP='${req.body.APROBDEP}',
        APROBCRED='${req.body.APROBCRED}',
        RECHAZADO='${req.body.RECHAZADO}'
         WHERE NROSCC= ${id}`);
      const resulte = await pool
        .request()
        .query(
          `SELECT * FROM  ${TABLE}.[Z_SCC]  Where NROSCC = ${id}`
        );

      res.send({ ...resulte.recordsets[0][0], status: 200 });
    } catch (e) {
      res.send({ msg: e, status: 400 });
    }
  },
  raproZSCC: async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .query(` SELECT* FROM ${TABLE}.[Z_SCC]
      WHERE  NROCOMP is null AND APROBCRED ='S' AND APROBDEP='S' `);
      res.send(result.recordset);
    } catch (e) {
      res.send({ msg: e, status: 400 });
    }
  },
  pdcabeza: async (req, res) => {
    try {
      const pool = await getConnection()
      const result = await pool.request()
      .query(`SELECT top 50 * FROM ${TABLE}.[PDCABEZA]`);
 res.send(result.recordset)
    } catch (e) {
      res.send({ msg: e, status: 400 });
    }
  },
delete: async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection()
    const result = await pool.request()
    .query(`DELETE FROM ${TABLE}.[PDCABEZA] WHERE NROPED = ${id}`);
  } catch (e) {
    res.send(e)
  }
},
//NUEVA SCC 

newSCC:async(req,res)=>{ 
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
        `SELECT * FROM ${TABLE}.[Z_SCC] where APROBCRED='S' and APROBDEP='S' and  NROCOMP IS NULL`
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
        `SELECT CLAVE, FUNCION FROM ${TABLE}.[TABLASI09]  where CLAVE = 'SI091PD00006X' `
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
          `SELECT * FROM ${TABLE}.[CLIENTES] WHERE NUMERO = '${clientes[i]}'`
        );
      let entrega = await pool
        .request()
        .query(
          `SELECT TRANSPORTE FROM ${TABLE}.[CLTESENTREGA] WHERE CLIENTE= '${clientes[i]}' `
        );
      let codigo = await cantidadDeDigitos(number);
            console.log(cliente[i],'is cliente in back');
      try {
        const response = await pool.request().query(`INSERT INTO ${TABLE}.[PDCABEZA] VALUES(
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
          null,
          null
        )`);
      
        console.log(response);
      } catch (err) {
        console.error(err);
      }
      
      for (let j = 0; j < buscarItemsClientes.length; j++) {
      
      let digito = await cantidadDeNUmeros([j + 1]);

       await pool.request().query(`INSERT INTO ${TABLE}.[PDITEMS] 
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
        await pool.request().query(`UPDATE ${TABLE}.[Z_SCC]  SET 
      NROCOMP='00006${codigo}'  where NROSCC=${item.NROSCC}`);
      }
    }

    await pool.request().query(`UPDATE ${TABLE}.[TABLASI09]  SET 
    FUNCION = '${number}'  where CLAVE = 'SI091PD00006X'`);
    res.send({msg:"scc comppletada",status:200});
  } catch (e) {
    res.send(e);
  }
}



};
module.exports = zsccController;

