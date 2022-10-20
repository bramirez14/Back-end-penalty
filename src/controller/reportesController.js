const DB = require("../database/models2");
const { getreportes } = require("./helpers/funcionesReportes");
const XLSX = require("xlsx");
const { zeroFill, removeCharacters } = require("./helpers/funciones");
const regex = /^[0-9]*$/; //solo contenga numero

const reportesController = {
  remito: async (req, res) => {
    try {
      let ress = await DB.w_remitos.findAll();

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
      const pendingDeliveryFilter = filterRemito.filter(
        (deliveryPending) => regex.test(deliveryPending.FechaPCC) !== false
      );
      const newArrayExcel = pendingDeliveryFilter.map((f) => {
        return {
          ...f,
          REMITO: zeroFill(f.Delivery, 8, "00026"),
         // fechafin: regex.test(f.FechaPCC)?new Date((f.FechaPCC - (25567 + 2)) * 86400 * 1000):null,
          fechafin: new Date((f.FechaPCC - (25567 + 2)) * 86400 * 1000),
          cliente: zeroFill(removeCharacters(f.ClienteDestino), 5),
        };
      });
      for (let i = 0; i < newArrayExcel.length; i++) {
        const element = newArrayExcel[i];
        if (element.Estado === "CAR") {
          await DB.w_remitos.update(
            {
              ESTADO: "DESPACHADO",
              fechafin: element.fechafin,
              REMITO: element.REMITO,
              cliente: element.cliente,
            },
            { where: { REMITO: element.REMITO } }
          );
        }
        if (element.Estado === "PRE") {
          await DB.w_remitos.update(
            {
              ESTADO: "PREPARADO",
              fechafin: element.fechafin,
              REMITO: element.REMITO,
              cliente: element.cliente,
            },
            { where: { REMITO: element.REMITO } }
          );
        }

        if (element.Estado === "ACT" || element.Estado === "ACO") {
          await DB.w_remitos.update(
            {
              ESTADO: "EN PREPARACION",
              fechafin: element.fechafin,
              REMITO: element.REMITO,
              cliente: element.cliente,
            },
            { where: { REMITO: element.REMITO } }
          );
        }
      }
      res.json({msg:'se modifico con exito!!!',status:200});
    } catch (e) {
      res.send(e);
    }
  },
};
module.exports = reportesController;
