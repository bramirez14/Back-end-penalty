const express = require("express");
const path = require("path");
const fs = require("fs");
const DB = require("../database/models2");
const pdf = require("html-pdf");

const reportesController = {
remito:async (req, res) => {
    try {
      let ress = await DB.remitos.findAll();

      res.send(ress);


    } catch (error) {
      res.send(error);
    }
  },
  remitoPdf: async (req, res) => {

    const header = req.header("archivo");
    console.log(header);
    res.sendFile(`C:/ftp/REMITOVACLOG/${header}`);
  },

  remmes:async (req, res) => {
    try {
      let result= await DB.remmes.findAll();
      res.send(result)
    } catch (error) {
      res.send(error)
    }
  }


}
module.exports = reportesController;