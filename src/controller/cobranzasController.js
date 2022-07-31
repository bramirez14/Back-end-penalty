const express = require("express");
const path = require("path");
const fs = require("fs");
const DB2 = require("../database/models2");
const DB = require("../database/models");

const pdf = require("html-pdf");
const { getcobranzas } = require("./helpers/funcionesCobranzas");
const { loadavg } = require("os");

const cobranzasController = {
  recibo: async (req, res) => {
    await getcobranzas(res, DB2.clientes);
  },
  postRecibo: async (req, res) => {
    try {
      const data = req.body;
      for (const d of data.newIngresos) {
        const a = await DB.recibosingresos.create(d);
      }
      for (const d of data.newDataCheck) {
        await DB.recibosliquidaciones.create(d);
      }

      res.send({ msg: "datos guardados con exito!!!", status: 200 });
    } catch (e) {
      res.send(e);
    }
  },
  todosRecibos: async (req, res) => {
    try {
      const a = await DB.recibosingresos.findAll();
      const b = await DB.recibosliquidaciones.findAll();
      const total = [a,b];
      res.send(total);
    } catch (e) {
      res.send(e);
    }
  },
  detalleRecibo: async (req, res) => {
    try {
      const { id } = req.params;
      
      const a = await DB.recibosingresos.findAll({
        where: {
          numerorecibo: id,
        },
      });
      const b = await DB.recibosliquidaciones.findAll({
        where: {
          numerorecibo: id,
        },
      });
     
      res.send([a,b]);
    } catch (e) {
      res.send(e);
    }
  },
  reciboComprobante: async (req, res) => {
    try {
      const { id}= req.params;
      const {ncomprobante} = req.body;
       await DB.recibosliquidaciones.update({ncomprobante},{where: {numerorecibo:id }})
       await DB.recibosingresos.update({ncomprobante},{where: {numerorecibo:id }})
       res.send({msg:'Comprobante agregado',status:200})
    } catch (e) {
      res.send(e)
    }
  },
};

module.exports = cobranzasController;
