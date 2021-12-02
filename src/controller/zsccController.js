const path = require("path");
const fs = require('fs-extra')
const DB = require("../database/models_SQL");
const {getConnection}= require("../sql/conexion")
const sequelize= require('../sequelize_sql/config')
const zsccController ={
    todasZSCC: async (req, res) => {
        try {
            const pool= await getConnection();

            const result = await pool.request().query('SELECT * FROM [WBT11_TEMP].[dbo].[Z_SCC]' );
     
          res.json(result.recordsets);

        } catch (e) {
            res.send(e)
        }
       
    },
idZSCC: async (req, res) => {
    try {
        const pool= await getConnection();
        const result = await pool
        .request()
        .input("id", req.params.id)
        .query("SELECT * FROM [WBT11_TEMP].[dbo].[Z_SCC] Where Id = @Id");
        console.log(result);
            if (result.rowsAffected[0] === 0) return res.sendStatus(404);
        
      return res.sendStatus(204);
    } catch (e) {
        res.send(e)
    }
},
agenda: async (req, res) => {
    try {
        const response= await DB.AGENDA.findAll()
        res.send(response)
    } catch (e) {
        res.send(e)
    }
}

/*     guardarVacacion: async (req, res) => {},
    editarVacacion: async (req, res) => {},
    eliminarVacacion: async (req, res) => {} */

}
module.exports = zsccController;