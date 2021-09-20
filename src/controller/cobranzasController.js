const express = require("express");
const path = require("path");
const fs = require("fs");
const DB = require("../database/models3");
const DBa = require("../database/models3a");

const pdf = require("html-pdf");
const { getcobranzas } = require("./helpers/funcionesCobranzas");
const { loadavg } = require("os");

const cobranzasController = {
  recibo: async (req, res) => {
    await getcobranzas(res, DB.clientes);
  },
  postRecibo: async (req, res) => {
    try {
      const data = req.body;
      console.log(data, "linea 15");
      for (const d of data.newIngresos) {
        const a = await DBa.recibosingresos.create(d);
      }
      for (const d of data.newDataCheck) {
        await DBa.recibosliquidaciones.create(d);
      }

      res.send({ msg: "datos guardados con exito!!!", status: 200 });
    } catch (e) {
      res.send(e);
    }
  },
  todosRecibos: async (req, res) => {
    try {
      const a = await DBa.recibosingresos.findAll();
      const b = await DBa.recibosliquidaciones.findAll();
      const total = [a,b];
      res.send(total);
    } catch (e) {
      res.send(e);
    }
  },
  detalleRecibo: async (req, res) => {
    try {
      const { id } = req.params;
      
      const a = await DBa.recibosingresos.findAll({
        where: {
          numerorecibo: id,
        },
      });
      const b = await DBa.recibosliquidaciones.findAll({
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
      console.log(id,'line64');
      const {ncomprobante} = req.body;
      console.log(ncomprobante,'line66');
       await DBa.recibosliquidaciones.update({ncomprobante},{where: {numerorecibo:id }})
       await DBa.recibosingresos.update({ncomprobante},{where: {numerorecibo:id }})
       res.send({msg:'Comprobante agregado',status:200})
    } catch (e) {
      res.send(e)
    }
  },
};

module.exports = cobranzasController;
