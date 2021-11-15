const path = require("path");
const fs = require('fs-extra')
const DB = require("../database/models_SQL");
const sql = require('mssql');
const {getConnection}= require('../sql/index');
const config= require('../sql/config');
const sequelize= require('../sequelize_sql/config')
const zsccController ={
    todasZSCC: async (req, res) => {
        try {
            const pool = await sql.connect(config);
            const result = await pool.request().query('SELECT * FROM [WBT11_TEMP].[dbo].[Z_SCC]' );
          /*   const pool = await getConnection();
           const result = await pool.request().query('SELECT * FROM Z_SCC')
          res.send(result) */
          res.json(result.recordsets);

        } catch (e) {
            res.send(e)
        }
       /*  try {
            console.log('aca estoy ');
            const response = await DB.Z_SCC.findAll();
            console.log(response,'line 10');
            res.send(response)
        } catch (e) {
            res.send(e)
        } */
    },
    
  /*   sequelize: async(req,res)=>{
         try {
             const response= await DB.AGENDA.findAll();
             console.log(response);
             res.send(response)
         } catch (e) {
             res.send(e)
         }
    }, */
    conexion: async( req,res)=>{
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    }



/*     guardarVacacion: async (req, res) => {},
    editarVacacion: async (req, res) => {},
    eliminarVacacion: async (req, res) => {} */

}
module.exports = zsccController;