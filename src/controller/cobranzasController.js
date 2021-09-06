const express = require("express");
const path = require("path");
const fs = require("fs");
const DB = require("../database/models3");
const pdf = require("html-pdf");
const { getcobranzas } = require("./helpers/funcionesCobranzas");

const cobranzasController = {
recibo: async (req, res) => {await getcobranzas(res,DB.clientes)},

}
//falta agregar de la DB.

module.exports = cobranzasController;
