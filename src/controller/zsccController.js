const path = require("path");
const fs = require("fs-extra");
const { getConnection } = require("../sql/conexion");
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
  editZSCC: async (req, res) => {
        const {id}= req.params;
    console.log(req.body,'line 88');
   try {
     //UPDATE `palaciosmoda`.`products` SET `name` = 'remera' WHERE (`id` = '67');
       const pool = await getConnection();
      const result = await pool
        .request()
        .query(`UPDATE [WBT11_TEMP].[dbo].[Z_SCC] SET 
        CANTPED=${req.body.CANTPED}, 
        CANTPEDT00=${req.body.CANTPEDT00} , 
        CANTPEDT01= ${req.body.CANTPEDT01},
        CANTPEDT02= ${req.body.CANTPEDT02},
        CANTPEDT03= ${req.body.CANTPEDT03},
        CANTPEDT04= ${req.body.CANTPEDT04},
        CANTPEDT05= ${req.body.CANTPEDT05},
        CANTPEDT06= ${req.body.CANTPEDT06},
        CANTPEDT07= ${req.body.CANTPEDT07},
        CANTPEDT08= ${req.body.CANTPEDT08},
        CANTPEDT09= ${req.body.CANTPEDT09},
        CANTPEDT10= ${req.body.CANTPEDT10},
        CANTPEDT11= ${req.body.CANTPEDT11},
        CANTPEDT12= ${req.body.CANTPEDT12},
        CANTPEDT13= ${req.body.CANTPEDT13},
        CANTPEDT14= ${req.body.CANTPEDT14},
        COMENTARIO='${req.body.COMENTARIO}',
        PRECIO=${req.body.PRECIO}
         WHERE NROSCC= ${id}`
        );
     /*    UPDATE [WBT11_TEMP].[dbo].[Z_SCC]
        SET COMENTARIO='soy10'WHERE NROSCC=10 */
        console.log(result);
      res.send(result)
    } catch (e) {
      res.send(e)
    }
  },


};
module.exports = zsccController;
