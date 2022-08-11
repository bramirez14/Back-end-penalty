const { getConnection } = require("../sql/conexion");

const reportesGestionSQLController = {
ctacte: async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .query("SELECT * FROM [WBT11_TEMP].[dbo].[VW_CTACTE]");
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
        .query("SELECT  * FROM [WBT11_TEMP].[dbo].[VW_CTAPRO]");
      res.send(result.recordset);
    } catch (e) {
      res.send({ msg: e, status: 400 });
    }
  }

}
module.exports = reportesGestionSQLController;
