const path = require("path");
const fs = require('fs-extra')
const DB = require("../database/models");

const vacacionesController ={
    todasVacaciones: async (req, res) => {
        try {
            const response = await DB.vacaciones.findAll({ include: ["usuario"] });
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    },
/*     guardarVacacion: async (req, res) => {},
    editarVacacion: async (req, res) => {},
    eliminarVacacion: async (req, res) => {} */

}
module.exports = vacacionesController;