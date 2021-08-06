const express = require("express");
const path = require("path");
const fs = require("fs");
const DB = require("../database/models2");
const pdf = require("html-pdf");
const { getreportes } = require("./helpers/funcionesReportes");

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

  remmes:async(req,res) => { await getreportes(res,DB.remmes)},//ok
  facturacionmes:async(req,res) => { await getreportes(res,DB.factmes)},//ok
  mesgral:async(req,res) => { await getreportes(res,DB.factmesfull)},//ok
  anno:async(req,res) => { await getreportes(res,DB.factcli)},//ok
  annogral:async(req,res) => { await getreportes(res,DB.factano)},//ok
  facturaciondetallada:async(req,res) => { await getreportes(res,DB.factcomp)},//ok
  cuentacorriente:async(req,res) => { await getreportes(res,DB.ctacte)},//ok
  cobranzames:async(req,res) => { await getreportes(res,DB.cobmes)},//ok
  cobranzaanno:async(req,res) => { await getreportes(res,DB.cobano)},//ok
  clientesinhabilitados:async(req,res) => { await getreportes(res,DB.inhab)},//ok
  cargapedidos:async(req,res) => { await getreportes(res,DB.cargped)},//ok
  pendientedetallado:async(req,res) => { await getreportes(res,DB.pendcomp)},//
  agrupadocliente:async(req,res) => { await getreportes(res,DB.pendcli)},//ok
  futurosingresos:async(req,res) => {await getreportes(res,DB.ingresos)},//ok
  stock:async(req,res) => { await getreportes(res,DB.stocks2)},
  w_scc: async (req, res) => {await getreportes(res,DB.w_scc)}

}
module.exports = reportesController;