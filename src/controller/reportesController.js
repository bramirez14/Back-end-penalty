const express = require("express");
const path = require("path");
const fs = require("fs");
const DB = require("../database/models2");
const pdf = require("html-pdf");

const reportesController = {
remito:async (req, res) => {
    try {
      let ress = await DB.remitos.findAll();
      console.log(ress);
      res.json(ress);
    } catch (error) {
      res.send(error);
    }
  },
  remitoPdf: async (req, res) => {
    let body ='Zuly votaciones.pdf'
    console.log('file:///C:/Users/bramirez/Desktop/archivosPDF/planUTH.pdf'); //me trae hasta el controller ojo!! recorda que el public esta cubierto con ruta estatica
    res.sendFile(path.join(__dirname,`../../../../archivosPDF/${body}`));
  },

}
module.exports = reportesController;