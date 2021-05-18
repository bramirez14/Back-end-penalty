const path = require("path");
const fs = require("fs");
const DB = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pdf = require("html-pdf");
var options = { format: "A4" };
//cloudinary
var cloudinary = require("cloudinary").v2;
//config cloudinary
cloudinary.config({
  cloud_name: "dtabhpdet",
  api_key: "177248816949724",
  api_secret: "wpeSwtO3MOHwwM58RFNf2BgYA9M",
});

//const { send } = require("process");
const {
  crearRendicion,
  guardarImagen,
  clo,
  tablaIntermedia,
} = require("../helper/funciones");

const usersController = {
  /**Lista de todos los usuarios*/
  todosGastos: async (req, res) => {
    try {
      let result = await DB.gastos.findAll({
        include: ["formapago", "usuario", "rendicion"],
      });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  },
  todoAnt: async (req, res) => {
    try {
      let result = await DB.anticipos.findAll({ include: ["usuario"] });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  },
  allusers: async (req, res) => {
    try {
      let result = await DB.usuarios.findAll({
        include: ["anticipo", "vacacion", "gasto", "departamento"],
      });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  },

  //Registro de Usuarios
  register: async (req, res) => {
    try {
      let data = req.body;
      console.log(data);
      const { email, password, password2 } = data;
      email.toLowerCase();
      //Verificamos que el user no este registrado en la DB
      let verify = await DB.usuarios.findOne({
        where: {
          email: email,
        },
      });
      !!verify ? res.send("Ya estas registrado/a") : "";
      //verificamos las contraseñas
      if (password === password2) {
        encryptedKey = bcrypt.hashSync(password, 10);
        //Creamos al usuario
        let user = await DB.usuarios.create({
          ...data,
          password: encryptedKey,
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
              { expiresIn: 28800 },
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
    } catch (error) {
      res.send(error);
    }
  },
  /*Log in*/

  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      email.toLowerCase();
      // Buscar usuario
      let user = await DB.usuarios.findOne({
        where: {
          email: email,
        },
      });
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
          { expiresIn: 28800 },
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
  check: async (req, res) => {
    const token = req.header("token");
    console.log();
    if (!token) return res.send("No hay token");
    try {
      const decoded = jwt.verify(token, "penalty");
      user = decoded.user; // este user viene del login linea 102
      res.send(user);
    } catch (e) {
      console.log(e);
      res.send("Token invalido");
    }
  },

  /******sector despues de Loguearse ******/
  anticipo: async (req, res) => {
    try {
      const data = req.body;
      const { usuId } = data;
      console.log(data, "soy el id del data");

      //crea el anticipo y lo relacion con el usuario
      const anticipoCreado = await DB.anticipos.create(data);
      /* await DB.usuarios.update(
        { anticipoId: anticipoCreado.id },
        {
          where: {
            id: usuId,
          },
        }
      ); */
      res.send(anticipoCreado);
    } catch (error) {
      res.send(error);
    }
  },
  anticipoRechazado: async (req, res) => {
    const { id } = req.params;
    const { respMensaje, estado } = req.body;
    console.log(respMensaje, "line190");
    console.log(estado, "line191");

    try {
      let antEditado = await DB.anticipos.update(
        { respMensaje, estado },
        {
          where: { id: id },
        }
      );
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  anticipoAprobado: async (req, res) => {
    const { id } = req.params;
    const { respMensaje, estado } = req.body;
    console.log(respMensaje, "line 205");
    console.log(estado, "line 206");
    try {
      let antEditado = await DB.anticipos.update(
        { respMensaje, estado },
        {
          where: { id: id },
        }
      );
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  borrarAnticipo: async (req, res) => {
    const { id } = req.params;
    console.log(id);
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
      let result = await DB.vacaciones.findAll();
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  },
  vacaciones: async (req, res) => {
    try {
      const data = req.body;
      console.log(data, "109");
      const vacacionesSolicitadas = await DB.vacaciones.create(data);
      console.log(vacacionesSolicitadas);
      res.send({ msg: "vacacion solicitada" });
    } catch (error) {
      res.send(error);
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
      const filePath = file.path;
      //guardamos imagen en cloudinary y DB
      let imagenURL = await cloudinary.uploader.upload(filePath);
      const data = req.body;
      console.log(data, "211");
      await crearRendicion({ ...data, imagen: imagenURL.secure_url });

      res.send("Rendicion e imagenes creadas satifactoriamente");
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
      console.log(data, "208");
      await DB.gastos.create(data);
      res.send("se creo correctamente");
    } catch (error) {
      res.send(error);
    }
  },
  gastos: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      console.log(data, "**************data*******************");
      console.log(id);

      await DB.rendiciones.update(data, {
        where: {
          id: id,
        },
      });
      res.send("ok");
    } catch (error) {
      res.send(error);
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
  usuarioPK: async (req, res) => {
    try {
      // id del producto
      const { id } = req.params;
      let usuario = await DB.usuarios.findByPk(id, {
        include: ["anticipo", "vacacion", "gasto", "departamento"],
      });
      res.send(usuario);
    } catch (error) {
      res.send(error);
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
      console.log(id);
      let a = await DB.rendiciones.findByPk(id, { all: true });
      console.log(a, "okkkkkkk");
      res.send(a);
    } catch (e) {
      res.send(e);
    }
  },
  crearGasto: async (req, res) => {
    try {
      const file = req.file;
      console.log(file, "soy file*****************************");
      const imgPath = file.path;
      const imagenURL = await cloudinary.uploader.upload(imgPath);
      const imagenSecure = imagenURL.secure_url;
      const data = req.body;
      console.log(data, "soy data *******************");
      let usuario = await DB.gastos.create({ ...data, imagen: imagenSecure });
      res.send(usuario);
    } catch (error) {
      res.send(error);
    }
  },
  crearImg: async (req, res) => {
    try {
      const { id } = req.params;
      const img = req.file;
      const imgPath = img.path;
      let imagenURL = await cloudinary.uploader.upload(imgPath);

      let imgCreada = await DB.rendiciones.update(
        { imagen: imagenURL.secure_url },
        {
          where: {
            id: id,
          },
        }
      );
      res.send(imgCreada);
    } catch (error) {
      res.send(error);
    }
  },
  gr: async (req, res) => {
    try {
      const data = req.body;
      const img = req.file;
      const imgPath = img.path;
      let imagenURL = await cloudinary.uploader.upload(imgPath);
      const { categoria, fecha, importe, notas, usuarioId, formapagoId } = data;
      const gasto = await DB.gastos.create({
        categoria,
        fecha,
        importe,
        notas,
        usuarioId,
        formapagoId,
      });
      const id = gasto.id;
      const rendicion = await DB.rendiciones.create({
        ...data,
        gastoId: id,
        imagen: imagenURL.secure_url,
      });
      console.log(rendicion);

      res.send("todo ok");
    } catch (e) {
      res.send(e);
    }
  },
  pdfCreate: async (req, res) => {
    try {
      console.log(req.body);
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
    console.log(departamentoId);
    const deptos = await DB.departamentos.findByPk(departamentoId);
    const { departamento, gerenteId } = deptos;
    const gerente = await DB.gerentes.findByPk(gerenteId);
    const { nombre, apellido, email } = gerente;
    console.log(data);

    //templateHtml = templateHtml.replace('{{data}}', data[0].importe)
    /* pdf.create(templateHtml,{data}).toFile('result.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }

      res.send(Promise.resolve());
  }); */
    res.render(
      "pdf",
      { data, usuario, email, departamento, nombre, apellido, id },
      function (err, html) {
        pdf.create(html).toFile("result.pdf", function (err, result) {
          if (err) {
            return console.log(err);
          } else {
            /*  console.log(res); */
            var datafile = fs.readFileSync("result.pdf");
            res.header("content-type", "application/pdf");
            res.send(datafile);
          }
        });
      }
    );
  },
  pd: async (req, res) => {
    console.log(path.join(__dirname)); //me trae hasta el controller ojo!! recorda que el public esta cubierto con ruta estatica
    res.sendFile(
      "C:/Users/bramirez/Desktop/PENALTY/Back-end-penalty/result.pdf"
    );
  },

  borrar: async (req, res) => {
    await DB.vacaciones.destroy({
      where: {
        id: 16,
      },
    });
  },
};

module.exports = usersController;
