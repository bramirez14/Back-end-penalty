const { getConnection } = require("../sql/conexion");

const reportesGestionSQLController = {
ctacte: async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .query("SELECT * FROM [WBT12].[dbo].[VW_CTACTE]");
      res.send(result.recordset);
    } catch (e) {
      res.send({ msg: e, status: 400 });
    }
  },
  ctacteprov: async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .query("SELECT  * FROM [WBT12].[dbo].[VW_CTAPRO]");
      res.send(result.recordset);
    } catch (e) {
      res.send({ msg: e, status: 400 });
    }
  },
  stock: async (req,res)=>{
    try {
      const pool = await getConnection();
      const result = await pool
      .request()
      .query("SELECT  * FROM [WBT12].[dbo].[VW_STOCK VENDEDORES]");
    res.send(result.recordset);
      
    } catch (e){res.send(e);}
  },
  ingresos: async(req,res)=>{
try {
  const pool = await getConnection();
      const result = await pool
      .request()
      .query("SELECT  * FROM [WBT12].[dbo].[VW_INGRESOS_VDOR]");
    res.send(result.recordset);
} catch (e) {res.send(e)}
},
pendientes: async(req,res)=>{
  try {
    const pool = await getConnection();
        const result = await pool
        .request()
        .query("SELECT  * FROM [WBT12].[dbo].[VW_PENDIENTE_WEB_AGRUP]");
      res.send(result.recordset);
  } catch (e) {res.send(e)}
  },
  pedidos: async(req,res)=>{
    try {
      const pool = await getConnection();
          const result = await pool
          .request()
          .query("SELECT  * FROM [WBT12].[dbo].[VW_PEDIDOS_CARGADOS]");
        res.send(result.recordset);
    } catch (e) {res.send(e)}
    },
    clienteInhabilitado: async(req,res)=>{
      try {
        const pool = await getConnection();
            const result = await pool
            .request()
            .query("SELECT  * FROM [WBT12].[dbo].[VW_CLIENTES_INHAB]");
          res.send(result.recordset);
      } catch (e) {res.send(e)}
      },
      cobranzawebMes: async(req,res)=>{
        try {
          const pool = await getConnection();
              const result = await pool
              .request()
              .query("SELECT  * FROM [WBT12].[dbo].[VW_COBRANZAWEB_MES]");
            res.send(result.recordset);
        } catch (e) {res.send(e)}
        },
        cobranzaweb: async(req,res)=>{
          try {
            const pool = await getConnection();
                const result = await pool
                .request()
                .query("SELECT  * FROM [WBT12].[dbo].[VW_COBRANZAWEB]");
              res.send(result.recordset);
          } catch (e) {res.send(e)}
          },
}
module.exports = reportesGestionSQLController;
