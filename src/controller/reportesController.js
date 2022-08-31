const express = require("express");
const path = require("path");
const fs = require("fs");
const DB = require("../database/models2");
const pdf = require("html-pdf");
const { getreportes } = require("./helpers/funcionesReportes");
const XLSX = require("xlsx");
const { zeroFill, removeCharacters } = require("./helpers/funciones");
const connection = require("../sql/mysql/model");
const regex = /^[0-9]*$/;

const reportesController = {
  remito: async (req, res) => {
    try {
      let ress = await DB.remitos.findAll();

      res.send(ress);
    } catch (error) {
      res.send(error);
    }
  },
  remitoPdf: async (req, res) => {
    const header = req.header("archivo");
    res.sendFile(`C:/xampp/htdocs/intranet/archivos/REMITOVACLOG/${header}`);
  },

  pdfComprobantes: async (req, res) => {
    const header = req.header("archivo");
    res.sendFile(
      `C:/xampp/htdocs/intranet/archivos/COMPROBANTES/${header}.pdf`
    );
  },

  remmes: async (req, res) => {
    await getreportes(res, DB.remmes);
  }, //ok
  facturacionmes: async (req, res) => {
    await getreportes(res, DB.factmes);
  }, //ok
  mesgral: async (req, res) => {
    await getreportes(res, DB.factmesfull);
  }, //ok
  anno: async (req, res) => {
    await getreportes(res, DB.factcli);
  }, //ok
  annogral: async (req, res) => {
    await getreportes(res, DB.factano);
  }, //ok
  facturaciondetallada: async (req, res) => {
    await getreportes(res, DB.factcomp);
  }, //ok
  cuentacorriente: async (req, res) => {
    await getreportes(res, DB.ctacte);
  }, //ok
  cobranzames: async (req, res) => {
    await getreportes(res, DB.cobmes);
  }, //ok
  cobranzaanno: async (req, res) => {
    await getreportes(res, DB.cobano);
  }, //ok
  clientesinhabilitados: async (req, res) => {
    await getreportes(res, DB.inhab);
  }, //ok
  cargapedidos: async (req, res) => {
    await getreportes(res, DB.cargped);
  }, //ok
  pendientedetallado: async (req, res) => {
    await getreportes(res, DB.pendcomp);
  }, //
  agrupadocliente: async (req, res) => {
    await getreportes(res, DB.pendcli);
  }, //ok
  futurosingresos: async (req, res) => {
    await getreportes(res, DB.ingresos);
  }, //ok
  stock: async (req, res) => {
    await getreportes(res, DB.stocks2);
  },
  w_scc: async (req, res) => {
    await getreportes(res, DB.w_scc);
  },

  fileExcel: async (req, res) => {
    try {
      const file = req.file;
      const workbook = XLSX.readFile(file.path);
      const workbookSheets = workbook.SheetNames;
      const sheet = workbookSheets[0];
      const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      const filterRemito = dataExcel.filter(
        (d) => regex.test(d.ClienteDestino) !== false
      );
      const newArrayExcel = filterRemito.map((f) => ({
        ...f,
        REMITO: zeroFill(f.Delivery, 8, "00026"),
        fechafin: new Date((f.FechaPCC - (25567 + 2)) * 86400 * 1000),
        cliente: zeroFill(removeCharacters(f.ClienteDestino), 5),
      }));
     // await DB.remitos.update({ cliente:'006165'},{where:{REMITO:'002600009793'}})
      //aca iniciamos la iteracion con un ciclo for
      for (let i = 0; i < newArrayExcel.length; i++) {
        const element = newArrayExcel[i];
       
        let sql = `UPDATE wbt8.w_remitos
        SET cliente=?,
        ESTADO = ?,
         fechafin=?
        WHERE  REMITO = ?`;

        if (element.Estado === "CAR") {
          console.log;
          let data = [element.cliente,"DESPACHADO",element.fechafin, element.REMITO];
          await connection.query(sql, data, (error, results, fields) => {
            //if (error) return res.send(error.message);
            console.log({
              error,
              results,
              fields
            });
            
          });
        }  
         if(element.Estado === 'PRE'){
          let data = [element.cliente,"PREPARADO",element.fechafin, element.REMITO];
          await connection.query(sql, data, (error, results, fields) => {
            //if (error) return res.send(error.message);
            console.log({
              error,
              results,
              fields
            });
          });
        }
        if(element.Estado === 'ACT'|| element.Estado === 'ACO'){
          let data = [element.cliente,"EN PREPARACION",element.fechafin, element.REMITO];
          await connection.query(sql, data, (error, results, fields) => {
          //  if (error) return res.send(error.message);
          console.log({
            error,
            results,
            fields
          });
          });
        } 
      }
      res.send("ok");

    } catch (e) {
      res.send(e);
    }
  },
};
module.exports = reportesController;
