const path = require("path");
const DB = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { send } = require("process");

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
      console.log(password);
      // Buscar usuario
      let user = await DB.usuarios.findOne({
        where: {
          email: email,
        },
      });

      let passwordCompared = bcrypt.compareSync(password, user.password);

      let token;
      if (!passwordCompared && !user === false) {
        res.send({
          status: 401,
          auth: false,
          message: "Usuario o Contraseña no son correctos",
        });
      } else {
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
      res.send({ msg: "vacacion solicitada"});
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = usersController;
