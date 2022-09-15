const express = require("express");
const path = require("path");
const fs = require("fs-extra");
const DB = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pdf = require("html-pdf");
var app = require("../app");
var http = require("http");
var server = http.createServer(app);
var socketIo = require("socket.io");
const io = socketIo(server); // desp continuares desde el controller para scoket io

//cloudinary
var cloudinary = require("cloudinary").v2;
//config cloudinary
cloudinary.config({
  cloud_name: "dxsyc4uog",
  api_key: "156983626536718",
  api_secret: "Oftadn9lC4ErCF5fNnOJRhe1zno",
});

//const { send } = require("process");
const {
  crearRendicion,
  guardarImagen,
  clo,
  tablaIntermedia,
} = require("./helpers/funciones");
const db = require("../database/models2");
const { log } = require("console");

const usersController = {
  files: async (req, res) => {
    try {
      const file = req.file;
      const fileFormat = file.mimetype.split("/");
      if (fileFormat[1] !== "pdf") {
        const filePath = file.path;
        const fileURL = await cloudinary.uploader.upload(filePath);
        const fileSecure = fileURL.secure_url;
        var result = await DB.imagenes.create({ imagen: fileSecure });
        await fs.unlink(filePath);
      } else {
        var result = await DB.pdfs.create({ pdf: file.originalname });
      }
      res.send({
        msg: "Archivo se cargo con exito",
        status: 200,
        result: result,
      });
    } catch (e) {
      res.send({ msg: e, status: 500 });
    }
  },
  fileDelete: async (req, res) => {
    try {
      const file = req.body;
      const fileFormat = file.type.split("/");
      const { id } = req.params;

      if (fileFormat[1] !== "pdf") {
        await DB.imagenes.destroy({
          where: { id },
        });
      } else {
        await DB.pdfs.destroy({
          where: { id },
        });
      }
      res.send({ msg: "Archivo se elimino con exito", status: 200 });
    } catch (e) {
      res.send(e);
    }
  },

  /**Lista de todos los usuarios*/
  todosGastos: async (req, res) => {
    try {
      let result = await DB.gastos.findAll({
        include: ["formapago", "usuario", "rendicion"],
        order: [["id", "DESC"]],
      });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  },
  todoAnt: async (req, res) => {
    try {
      let result = await DB.anticipos.findAll({
        include: ["usuario"],
        order: [["id", "DESC"]],
      });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  },
  allusers: async (req, res) => {
    try {
      let result = await DB.usuarios.findAll({
        include: [
          "anticipo",
          "vacacion",
          "gasto",
          "departamento",
          "kilometro",
          "gerente",
        ],
      });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  },
  usuarioPK: async (req, res) => {
    try {
      // id del producto
      const { id } = req.params;
      let usuario = await DB.usuarios.findByPk(id, {
        include: [
          "anticipo",
          "vacacion",
          "gasto",
          "departamento",
          "kilometro",
          "gerente",
        ],
      });
      res.send(usuario);
    } catch (error) {
      res.send(error);
    }
  },
  dtos: async (req, res) => {
    try {
      let result = await DB.departamentos.findAll();
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  },

  //Registro de Usuarios
  register: async (req, res) => {
    try {
      let data = req.body;
      const { email, password, password2 } = data;
      let e = email.toLowerCase();
      //Verificamos que el user no este registrado en la DB
      let verify = await DB.usuarios.findOne({
        where: {
          email: e,
        },
      });
      if (!!verify) {
        res.send({ message: "Ya estas registrado/a", status: 400 });
      } else {
        //verificamos las contraseñas
        if (password === password2) {
          encryptedKey = bcrypt.hashSync(password, 10);
          //Creamos al usuario
          let user = await DB.usuarios.create({
            ...data,
            password: encryptedKey,
            email: e,
            gerenteId
          });
          let token;
          !user
            ? res.send(
                "No pudo crearse el usuario intentelo mas tarde , gracias "
              )
            : // Creamos el token
              await jwt.sign(
                { user: user },
                "penalty",
                { expiresIn: 14400 },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    user: user,
                    token: token,
                  });
                }
              );
        } else {
          res.send("Las contraseñas no son iguales");
        }
      }
    } catch (error) {
      res.send(error);
    }
  },
  /*Log in*/

  login: async (req, res) => {
    try {
      let { email, password, conectado } = req.body;
      let e = email.toLowerCase();

      // Buscar usuario
      let user = await DB.usuarios.findOne({
        where: {
          email: e,
        },
      });
      !!user
        ? await DB.usuarios.update(
            { conectado },
            {
              where: {
                id: user.id,
              },
            }
          )
        : "";

      /*condicional para verificar si no existe el usuario */
      if (!!user === false) {
        res.send({
          status: 401,
          auth: false,
          message: "No estas registrado/a",
        });
      }
      let passwordCompared = bcrypt.compareSync(password, user.password);

      /*condicional para verificar al usuario existente en DB y comprobar la contraseña si machea */
      if (!passwordCompared && !user === false) {
        res.send({
          status: 401,
          auth: false,
          message: "Usuario o Contraseña no son correctos",
        });
      } else {
        /*El token para validar al usuario */
        await jwt.sign(
          { user: user },
          "penalty",
          { expiresIn: 14400 },
          (err, token) => {
            if (err) throw err;
            res.json({
              user: user,
              token: token,
            });
          }
        );
      }
    } catch (error) {
      res.send(error);
    }
  },
  cambiarContraña: async (req, res) => {
    const { id, password } = req.body;
    const passwordNew = bcrypt.hashSync(password, 10);
    await DB.usuarios.update(
      { password: passwordNew },
      {
        where: {
          id,
        },
      }
    );
    res.send({ msg: "ok", status: 200 });
  },
  check: async (req, res) => {
    const token = req.header("token");
    if (!token) return res.send("No hay token");
    try {
      const decoded = jwt.verify(token, "penalty");
      user = decoded.user; // este user viene del login linea 102
      res.send(user);
    } catch (e) {
      res.send("Token invalido");
    }
  },

  /******sector despues de Loguearse ******/
  anticipo: async (req, res) => {
    try {
      const data = req.body;

      anticipoCreado = await DB.anticipos.create(data);

      res.send(anticipoCreado);
    } catch (e) {
      res.send(e);
    }
  },
  anticipoRechazado: async (req, res) => {
    const { id } = req.params;

    const data = req.body;
    try {
      await DB.anticipos.update(data, {
        where: { id: id },
      });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  anticipoAprobado: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      await DB.anticipos.update(data, {
        where: { id: id },
      });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },

  borrarAnticipo: async (req, res) => {
    const { id } = req.params;
    try {
      await DB.anticipos.destroy({
        where: { id },
      });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  allvacaciones: async (req, res) => {
    try {
      /* let result = await DB.usuarios.findAll({
    include:["anticipo"]
  });*/
      let result = await DB.vacaciones.findAll({
        include: ["usuario"],
        order: [["id", "DESC"]],
      });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  },
  vacaciones: async (req, res) => {
    try {
      const data = req.body;
      await DB.vacaciones.create(data);
      res.send({ msg: "vacacion solicitada" });
    } catch (error) {
      res.send(error);
    }
  },
  vacacionesRechazado: async (req, res) => {
    const { id } = req.params;

    const data = req.body;
    try {
      let antEditado = await DB.vacaciones.update(data, {
        where: { id: id },
      });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  vacacionesAprobado: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      let antEditado = await DB.vacaciones.update(data, {
        where: { id: id },
      });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  borrarVacacion: async (req, res) => {
    try {
      const { id } = req.params;
      await DB.vacaciones.destroy({
        where: { id },
      });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  listaDiasVacaciones: async (req, res) => {
    try {
      let result = await DB.diasvacaciones.findAll();
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  },

  rendicion: async (req, res) => {
    try {
      const file = req.file;
      const data = req.body;
      const extension = file?.mimetype.split("/");
      const { gastoId, total } = data;

      await DB.gastos.update(
        {
          importerendido: total,
        },
        {
          where: {
            id: gastoId,
          },
        }
      );
      if (file === undefined) {
        await DB.rendiciones.create(data);
      } else {
        if (extension[1] === "pdf") {
          await DB.rendiciones.create({ ...data, archivo: file.originalname });
        } else {
          //guardamos imagen en cloudinary y DB
          const imgPath = file.path;
          const imagenURL = await cloudinary.uploader.upload(imgPath);
          const imagenSecure = imagenURL.secure_url;
          await DB.rendiciones.create({ ...data, archivo: imagenSecure });
        }
      }
      res.send({
        msg: "Rendicion e imagen creadas satifactoriamente",
        status: 200,
      });
    } catch (error) {
      res.send(error);
    }
  },

  gerentes: async (req, res) => {
    try {
      let result = await DB.gerentes.findAll({ include: ["departamento"] });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  },
  mpagos: async (req, res) => {
    try {
      let result = await DB.formapagos.findAll();
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  },
  antpagos: async (req, res) => {
    try {
      const data = req.body;

      await DB.gastos.create({ ...data, importerendido: data.importe });
      res.send("se creo correctamente");
    } catch (error) {
      res.send(error);
    }
  },

  gastoRechazado: async (req, res) => {
    const { id } = req.params;

    const data = req.body;
    try {
      let antEditado = await DB.gastos.update(data, {
        where: { id: id },
      });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  gastoAprobado: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      let antEditado = await DB.gastos.update(data, {
        where: { id: id },
      });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  borrarGasto: async (req, res) => {
    try {
      const { id } = req.params;
      await DB.rendiciones.destroy({
        where: { gastoId: id },
      });
      await DB.gastos.destroy({
        where: { id },
      });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },

  editarRendicion: async (req, res) => {
    try {
      // id del producto
      const { id } = req.params;
      let gastos = await DB.gastos.findByPk(id);
      res.send(gastos);
    } catch (error) {
      res.send(error);
    }
  },
  gastoFinalizados: async (req, res) => {
    try {
      const { id } = req.params;
      const { listo, procesoFinalizado } = req.body;
      await DB.gastos.update({ listo, procesoFinalizado }, { where: { id } });

      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  verificacionGasto: async (req, res) => {
    try {
      const { id } = req.params;
      const { aprobacion } = req.body;
      await DB.gastos.update({ aprobacion }, { where: { id } });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },

  agregarImgUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const img = req.file;
      const imgPath = img.path;
      let imagenURL = await cloudinary.uploader.upload(imgPath);
      let imgCreada = await DB.usuarios.update(
        { imagen: imagenURL.secure_url },
        {
          where: {
            id: id,
          },
        }
      );
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  cerrarSesion: async (req, res) => {
    try {
      const { id } = req.params;
      const { conectado } = req.body;
      await DB.usuarios.update({ conectado }, { where: { id } });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  gastoPK: async (req, res) => {
    try {
      const { id } = req.params;
      let g = await DB.gastos.findByPk(id, {
        include: ["formapago", "usuario", "rendicion"],
      });
      res.send(g);
    } catch (e) {
      res.send(e);
    }
  },
  rendicionPK: async (req, res) => {
    try {
      const { id } = req.params;
      let a = await DB.rendiciones.findByPk(id, { all: true });
      res.send(a);
    } catch (e) {
      res.send(e);
    }
  },

  crearGasto: async (req, res) => {
    try {
      const file = req.file;
      const data = req.body;

      if (file === undefined) {
        await DB.gastos.create(data);
      } else {
        const imgPath = file.path;
        const imagenURL = await cloudinary.uploader.upload(imgPath);
        const imagenSecure = imagenURL.secure_url;
        await DB.gastos.create({ ...data, imagen: imagenSecure });
      }
      res.send({ msg: "ok", status: 200 });
    } catch (error) {
      res.send(error);
    }
  },
  editarGasto: async (req, res) => {
    try {
      const { id } = req.params;
      const file = req.file;
      const data = req.body;
      const { gastoId, total } = data;
      const extension = file?.mimetype.split("/");
      await DB.gastos.update(
        { importerendido: total },
        {
          where: {
            id: gastoId,
          },
        }
      );

      if (file !== undefined) {
        if (extension[1] === "pdf") {
          await DB.rendiciones.update(
            { ...data, archivo: file.originalname },
            {
              where: {
                id: id,
              },
            }
          );
        } else {
          const imgPath = file.path;
          let imagenURL = await cloudinary.uploader.upload(imgPath);

          await DB.rendiciones.update(
            { ...data, archivo: imagenURL.secure_url },
            {
              where: {
                id: id,
              },
            }
          );
        }
      } else {
        await DB.rendiciones.update(data, {
          where: {
            id: id,
          },
        });
      }

      res.send({ msg: "ok", status: 200 });
    } catch (error) {
      res.send(error);
    }
  },
  gr: async (req, res) => {
    try {
      const data = req.body;
      const file = req.file;

      const { id } = await DB.gastos.create(data);
      let rendicionCreada;
      if (file === undefined) {
        rendicionCreada = await DB.rendiciones.create({
          ...data,
          gastoId: id,
        });
      } else {
        const extension = file.mimetype.split("/")[1];
        if (extension !== "pdf") {
          const imgPath = file.path;
          let imagenURL = await cloudinary.uploader.upload(imgPath);

          rendicionCreada = await DB.rendiciones.create({
            ...data,
            gastoId: id,
            archivo: imagenURL.secure_url,
          });
        } else {
          rendicionCreada = await DB.rendiciones.create({
            ...data,
            gastoId: id,
            archivo: file.originalname,
          });
        }
      }
      res.send({ data: rendicionCreada, msg: "ok", status: 200 });
    } catch (e) {
      res.send(e);
    }
  },
  deleterendicion: async (req, res) => {
    const { id } = req.params;

    try {
      await DB.rendiciones.destroy({
        where: { id },
      });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },

  finalizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { procesoFinalizado } = req.body;
      await DB.gastos.update({ procesoFinalizado }, { where: { id } });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  pagoAnt: async (req, res) => {
    const { id } = req.params;
    const { pagoRealizado } = req.body;
    await DB.anticipos.update({ pagoRealizado }, { where: { id } });
    res.send("ok");
  },
  pagoGasto: async (req, res) => {
    try {
      const { id } = req.params;
      const { filename } = req.file;
      const { pagoRealizado } = req.body;

      await DB.gastos.update(
        { pagoRealizado, pdfinal: filename },
        { where: { id } }
      );
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  pagofinalGasto: async (req, res) => {
    try {
      const { id } = req.params;
      const { filename } = req.file;

      await DB.gastos.update({ pdfpagoFinal: filename }, { where: { id } });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },

  encurso: async (req, res) => {
    try {
      const { id } = req.params;
      const { pagoRealizado } = req.body;
      await DB.gastos.update({ pagoRealizado }, { where: { id } });
      res.send("ok");
    } catch (e) {
      res.send;
    }
  },

  pdfCreate: async (req, res) => {
    try {
      pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err, r) => {
        if (err) {
          res.send(Promise.reject());
        }

        res.send(r);
      });
    } catch (e) {
      res.send(e);
    }
  },

  generadorPdf: async (req, res) => {
    const data = req.body;
    const id = data[0].gastoId;
    const gasto = await DB.gastos.findByPk(id);
    const { usuarioId } = gasto;
    const usuario = await DB.usuarios.findByPk(usuarioId);
    const { departamentoId } = usuario;
    const deptos = await DB.departamentos.findByPk(departamentoId);
    const { departamento, gerenteId } = deptos;
    const gerente = await DB.gerentes.findByPk(gerenteId);
    const { nombre, apellido, email } = gerente;

    res.render(
      "pdf",
      { data, usuario, email, departamento, nombre, apellido, id, gasto },
      function (err, html) {
        pdf.create(html).toFile("result.pdf", function (err, result) {
          if (err) {
            return (err, "error");
          } else {
            var datafile = fs.readFileSync("result.pdf");
            res.header("content-type", "application/pdf");
            res.send(datafile);
          }
        });
      }
    );
  },
  //se usar apa todos los pfd fataria cambiar el nombre 
  gastoPDF: async (req, res) => {
    try {
      const header = req.header("archivo");
      res.sendFile(path.join(__dirname, `../file/public/${header}`));
    } catch (error) {
      res.send(e);
    }
  },
  pd: async (req, res) => {
    res.sendFile(path.join(__dirname, "../../result.pdf"));
  },

  archivoPdf: async (req, res) => {
    try {
      const { id } = req.params;
      const { norden, procesoFinalizado } = req.body;
      const { filename } = req.file;
      await DB.gastos.update(
        { pdf: filename, norden, procesoFinalizado },
        { where: { id } }
      );
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  kilometros: async (req, res) => {
    try {
      const resp = await DB.kilometros.findAll({
        include: { all: true },
        order: [["id", "DESC"]],
      });
      res.send(resp);
    } catch (e) {
      res.send(e);
    }
  },
  kmRendicion: async (req, res) => {
    try {
      
      const resp = await DB.rendicioneskms.findAll();
      res.send(resp);
    } catch (e) {
      res.send(e);
    }
  },

  Km: async (req, res) => {
    try {
      const data = req.body;
      const result = await DB.rendicioneskms.create(data);
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  Kms: async (req, res) => {
    try {
      const data = req.body;
      const verificacion = Array.isArray(data.id);
      const img = req.file;
      const imgPath = img.path;
      let imagenURL = await cloudinary.uploader.upload(imgPath);
      const { importeTotal, kmTotal, usuarioId, alertaId } = data;
      const km = await DB.kilometros.create({
        importeTotal,
        kmTotal,
        usuarioId,
        imagen: imagenURL.secure_url,
        listo: "Si",
        estado: "pendiente",
        estadoFinal: "pendiente",
        alertaId,
      });
      if (verificacion === true) {
        for (const d of data.id) {
          let v = await DB.rendicioneskms.update(
            {
              kilometroId: km.id,
            },
            {
              where: { id: d },
            }
          );
        }
      } else {
        let v = await DB.rendicioneskms.update(
          {
            kilometroId: km.id,
          },
          {
            where: { id: data.id },
          }
        );
      }

      res.send({ msg: "completado", status: 200 });
    } catch (e) {
      res.send(e);
    }
  },
  kmId: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await DB.kilometros.findByPk(id);
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },
  kmAprobado: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      await DB.kilometros.update(data, {
        where: { id: id },
      });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  kmRechazado: async (req, res) => {
    const { id } = req.params;

    const data = req.body;

    try {
      await DB.kilometros.update(data, {
        where: { id: id },
      });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  kmPdf: async (req, res) => {
    try {
      const { id } = req.params;
      const { norden, procesoFinalizado } = req.body;
      const { filename } = req.file;
      await DB.kilometros.update(
        { pdf: filename, norden, procesoFinalizado },
        { where: { id } }
      );
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  kmborrar: async (req, res) => {
    try {
      const { id } = req.params;
      //const busquedaId= await DB.rendicioneskms.findAll( )
      // const filtradoId= busquedaId.filter(d=>d.kilometroId !== id  )

      /* for (const d of filtradoId) {
        await DB.rendicioneskms.destroy({
          where:{ id:d.id}
        })
      }
      await DB.kilometros.destroy({
        where: {id} ,
      }); */

      await DB.rendicioneskms.destroy({
        where: { kilometroId: id },
      });
      await DB.kilometros.destroy({
        where: { id },
      });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  pagoPDF: async (req, res) => {
    try {
      const { id } = req.params;

      const { filename } = req.file;

      const { procesoPagar } = req.body;

      await DB.kilometros.update(
        { procesoPagar, pdfinal: filename },
        { where: { id } }
      );
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  pagokmfinal: async (req, res) => {
    try {
      const { id } = req.params;
      const { filename } = req.file;
    
      await DB.kilometros.update({ pdfpagoFinal: filename }, { where: { id } });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  DeletekmRendicion: async (req, res) => {
    try {
      const { id } = req.params;
      await DB.rendicioneskms.destroy({
        where: {
          id,
        },
      });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  sueldoPdf: async (req, res) => {
    try {
      const { id } = req.params;
      const { norden, procesoFinalizado } = req.body;
      const { filename } = req.file;
      await DB.anticipos.update(
        { pdf: filename, norden, procesoFinalizado },
        { where: { id } }
      );
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  sueldoPDF: async (req, res) => {
    try {
      const { id } = req.params;
      const { filename } = req.file;
      const { pagoRealizado } = req.body;

      await DB.anticipos.update(
        { pagoRealizado, pdfinal: filename },
        { where: { id } }
      );
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  sueldopdffinal: async (req, res) => {
    try {
      const { id } = req.params;
      const { filename } = req.file;
      await DB.anticipos.update({ pdfpagoFinal: filename }, { where: { id } });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  //alertas
  alertaanticipo: async (req, res) => {
    try {
      const { id } = req.params;
      const { notificacion } = req.body;
      await DB.anticipos.update({ notificacion }, { where: { id } });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  alertagasto: async (req, res) => {
    try {
    } catch (e) {
      res.send(e);
    }
  },
  alertavacaciones: async (req, res) => {
    try {
    } catch (e) {
      res.send(e);
    }
  },
  alertakm: async (req, res) => {
    try {
    } catch (e) {
      res.send(e);
    }
  },
  preciokm: async (req, res) => {
    try {
      const { precio } = req.body;
      await DB.preciokms.update({ precio }, { where: { id: 1 } });
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  precioactualkm: async (req, res) => {
    try {
      const resul = await DB.preciokms.findAll();
      res.send(resul);
    } catch (e) {
      res.send(e);
    }
  },

  alerta: async (req, res) => {
    try {
      const resut = await DB.gastos.findAll();
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },

  borrar: async (req, res) => {
    /* await DB.vacaciones.destroy({
      where: {
        id: 16,
      },
    }); */
  },
  /*tarjet de credito y otros mediios de pago*/
  todasTJ: async (req, res) => {
    try {
      res.send(await DB.tarjetacreditos.findAll({ order: [["id", "DESC"]] }));
    } catch (e) {
      res.send(e);
    }
  },
  TJ: async (req, res) => {
    try {
      const file = req.file;
      const data = req.body;
      const fileFormat = file.mimetype.split("/");
      const filePath = file.path;
      const fileURL = await cloudinary.uploader.upload(filePath);
      const fileSecure = fileURL.secure_url;

      if (fileFormat[1] !== "pdf") {
        var result = await DB.tarjetacreditos.create({
          ...data,
          archivo: fileSecure,
        });
        await fs.unlink(filePath); // borrar img q se guardar e la carpeta
      } else {
        var result = await DB.tarjetacreditos.create({
          ...data,
          archivo: file.originalname,
        });
      }
      res.send({ result, msg: "creado con exito", status: 200 });
    } catch (e) {
      res.send(e);
    }
  },
  addCreditCard:async(req,res) => { 
    try {
      const {tarjeta} = req.body;
      let result=await DB.formaspagoscreditos.create({tarjeta});
      res.send({  result, msg: "creado con exito", status:200})
    } catch (e) {
      res.send(e);
    }
  },
    addPaymentMethod: async (req, res) => {
    try {
     const {tarjeta} = req.body;
     await DB.formapagos.create({pago:tarjeta});
     res.send({msg:'Se creo con exito',status:200});
    } catch (e) {
      res.send({ msg: e, status: 400 });
    }
  },
  allCrediCard: async (req, res) => { 
    try {
      const resp=await DB.formaspagoscreditos.findAll();
      res.send(resp)
    } catch (e) {
      res.send(e)
    }
  },

  //descarga de pdf
  PDF: async (req, res) => {
    try {
      const header = req.header("archivo");
      res.sendFile(path.join(__dirname, `../../public/upload/${header}`));
    } catch (error) {
      res.send(e);
    }
  },

  /** Generador de pdf recibos provisorios */
  generadorPdfRecibo: async (req, res) => {
    const data = req.body;
    res.render(
      "recibo",
      {
        ingresos: data[0].ingresos,
        cliente: data[1].cliente,
        fact: data[2].facturacion,
      },
      function (err, html) {
        pdf.create(html).toFile("recibo.pdf", function (err, result) {
          if (err) {
            return (err, "error");
          } else {
            var datafile = fs.readFileSync("recibo.pdf");
            res.header("content-type", "application/pdf");
            res.send({ msg: datafile, status: 200 });
          }
        });
      }
    );
  },
  pdfRecibo: async (req, res) => {
    res.sendFile(path.join(__dirname, "../../recibo.pdf"));
  },
  //funcion para editar archivos de  pago/gasto
  //pdf gastos
  editarGastoPDF: async (req, res) => {
    try {
      const { id } = req.params;
      const file = req.file;
      await DB.gastos.update({ pdf: file.filename }, { where: { id: id } });
      res.send({ msg: "la modificacion fue un exito", status: 200 });
    } catch (error) {
      res.send(error);
    }
  },
  //pdfinal de gastos
  editarGastoPDFinal: async (req, res) => {
    try {
      const { id } = req.params;
      const file = req.file;
      await DB.gastos.update({ pdfinal: file.filename }, { where: { id: id } });
      res.send({ msg: "la modificacion fue un exito", status: 200 });
    } catch (error) {
      res.send(error);
    }
  },

  // solo admite pdf Orden de  pago final
  editarGastoPDFOpFinal: async (req, res) => {
    try {
      const { id } = req.params;
      const file = req.file;
      await DB.gastos.update(
        { pdfpagoFinal: file.filename },
        { where: { id: id } }
      );
      res.send({ msg: "la modificacion fue un exito", status: 200 });
    } catch (error) {
      res.send(error);
    }
  },
  //editar usuario
  editarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      if (data.epassword===undefined) {
        await DB.usuarios.update({ ...data }, { where: { id: id } });
        res.send({ message: "Editamos el usuario", status: 200 });
      }else{
        if (data.epassword === data.epassword2) {
        //Editamos el usuario
        const user = await DB.usuarios.update(
          { ...data, password: bcrypt.hashSync(data.epassword, 10) },
          { where: { id: id } }
        );
        res.send({ message: "Editamos el usuario y cambiamos contrasena", status: 200, result: user });
        throw Exception('Las contraseñas no son iguales');
      } 
      } 
    } catch (error) {
      res.send(error);
    }
  },
  // Eliminamos un usuario
  deleteUser:async(req,res)=>{
    try {
      const { id } = req.params;
      this.deleteVacacion()
      await DB.usuarios.destroy({
        where: { id },
      });
      res.send({msg:'usuario eliminado',status:200});
    } catch (e) {
      res.send(e);
    }
  },
  //Eliminar Vacacinos
  deleteVacacion:async(req,res)=>{
    try {
      const { id } = req.params;
      console.log(id);
      await DB.vacaciones.destroy({
        where: { id },
      })
      res.send({msg:"vacaciones eliminadas",status:200});

    } catch (e){res.send(e)}
  },

  //ediatmos pdf de kilometros
  editarKmPDFproveedores: async (req, res) => {
    try {
      const { id } = req.params;
      const file = req.file;
      await DB.kilometros.update({ pdf: file.filename }, { where: { id: id } });
      res.send({ msg: "la modificacion fue un exito", status: 200 });
    } catch (e) {
      res.send(e);
    }
  },
  editarKmPDFpago :async (req, res) => {
    try {
      const { id } = req.params;
      const file = req.file;
      await DB.kilometros.update({ pdfinal: file.filename }, { where: { id: id } });
      res.send({ msg: "la modificacion fue un exito", status: 200 });
    } catch (e) {
      res.send(e);
    }
  },
  editarKmPDFOpFinal: async (req, res) => {
    try {
      const { id } = req.params;
      const file = req.file;
      await DB.kilometros.update({ pdfpagoFinal: file.filename }, { where: { id: id } });
      res.send({ msg: "la modificacion fue un exito", status: 200 });
    } catch (e) {
      res.send(e);
    }
  },
};

module.exports = usersController;
