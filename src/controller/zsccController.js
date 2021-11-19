const path = require("path");
const fs = require("fs-extra");
const DB = require("../database/models_SQL");
const { getConnection } = require("../sql/conexion");
const sequelize = require("../sequelize_sql/config");
const zsccController = {
  todasZSCC: async (req, res) => {
    try {
      const pool = await getConnection();

      const result = await pool
        .request()
        .query("SELECT * FROM [WBT11_TEMP].[dbo].[Z_SCC]");

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
          `SELECT * FROM  [WBT11_TEMP].[dbo].[Z_SCC]  Where NROSCC = ${id}`
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
          "SELECT NUMERO,CODTALLE,DESCRIP FROM [WBT11_TEMP].[dbo].[ARTICULO]"
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
        .query(
          "SELECT * FROM [WBT11_TEMP].[dbo].[VW_TALLES]"
        );

      res.send(result.recordsets);
    } catch (e) {
      res.send(e);
    }
  },

  /*     guardarVacacion: async (req, res) => {},
    editarVacacion: async (req, res) => {},
    eliminarVacacion: async (req, res) => {} */
};
module.exports = zsccController;
