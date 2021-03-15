const path = require("path");
const DB = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const { send } = require("process");
const {
  crearRendicion,
  guardarImagen,
  clo,
  tablaIntermedia,
} = require("../helper/funciones");

const usersController = {
  /**Lista de todos los usuarios*/
  allusers: async (req, res) => {
    try {
      let result = await DB.usuarios.findAll();
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
       email.toLowerCase()
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
            (token = await jwt.sign({ user: user }, "penalty", {
              expiresIn: 3600,
            }));
        res.json({
          user: user,
          token: token,
        });
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
      email.toLowerCase()
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
      let token;
      /*condicional para verificar al usuario existente en DB y comprobar la contraseña si machea */
      if (!passwordCompared && !user === false) {
        res.send({
          status: 401,
          auth: false,
          message: "Usuario o Contraseña no son correctos",
        });
      } else {
        /*El token para validar a l usuario */
        token = await jwt.sign({ user: user }, "penalty", {
          expiresIn: 3600,
        });
        res.json({
          user: user,
          token: token,
        });
      }
    } catch (error) {
      res.send(error);
    }
  },
  /******sector despues de Loguearse ******/
  anticipo: async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      //crea el anticipo y lo relacion con el usuario
      const anticipoCreated = await DB.anticipos.create(data);
      res.send("ok");
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
  rendicion: async (req, res) => {
    try {
      const data = req.body;
      console.log(data, "122");
      const rendicionCreada = await crearRendicion(data);
      //guardamos imagenes en cloudinary y DB
      const archivos = req.files;
      console.log(archivos, "127");
      const imagenes = archivos.map((archivo) => archivo.path);
      console.log(imagenes, "132");
      const imagenesNuevas = await clo(imagenes);
      console.log(imagenesNuevas, "134");

      const guardarImagenes = await guardarImagen(imagenesNuevas);
      console.log(guardarImagenes, "137");
      //guardamos los datos en la tabla intermedia
      let tabla = await tablaIntermedia(
        guardarImagenes,
        rendicionCreada.dataValues.id
      );
      console.log(tabla, "140");
      res.send("Rendicion e imagenes creadas satifactoriamente");
    } catch (error) {
      res.send(error);
    }
  },
  gerentes: async (req, res) => {
    try {
    } catch (error) {}
  },
};

module.exports = usersController;
