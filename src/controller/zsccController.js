const path = require("path");
const fs = require('fs-extra')
const DB = require("../database/models_SQL");
const config= require("../sql/config")

const sql = require('mssql')
const zsccController ={
    todasZSCC: async (req, res) => {
        try {

            const pool = await sql.connect(config);
            const result = await pool.request().query('SELECT FROM * ');
            res.json(result.recordsets);

           /*  console.log('aca estoy ');
            const response = await DB.Z_SCC.findAll();
            console.log(response,'line 10');
            res.send(response) */
        } catch (e) {
            res.send(e)
        }
    },
/*     guardarVacacion: async (req, res) => {},
    editarVacacion: async (req, res) => {},
    eliminarVacacion: async (req, res) => {} */

}
module.exports = zsccController;