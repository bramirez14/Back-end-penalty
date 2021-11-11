const path = require("path");
const fs = require('fs-extra')
const DB = require("../database/models_SQL");

const zsccController ={
    todasZSCC: async (req, res) => {
        try {
            console.log('aca estoy ');
            const response = await DB.Z_SCC.findAll();
            console.log(response,'line 10');
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    },
/*     guardarVacacion: async (req, res) => {},
    editarVacacion: async (req, res) => {},
    eliminarVacacion: async (req, res) => {} */

}
module.exports = zsccController;