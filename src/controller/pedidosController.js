const { getConnection } = require("../sql/conexion");

const pedidosController = {
pasePedidos: async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .query("SELECT * FROM [WBT11].[dbo].[VW_APROBACION_PEDIDOS_FINAL]");
      res.send(result.recordset);
    } catch (e) {
      res.send({ msg: e, status: 400 });
    }
  }

}
module.exports = pedidosController;
