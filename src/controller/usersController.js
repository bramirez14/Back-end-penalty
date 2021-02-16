const path = require("path");
const DB = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const usersController = {
  //Registro de Usuarios
  register: async (req, res) => {
    try {
      let { email, password, usuario, nombre, password2 } = req.body;
      console.log(email)
          console.log(password)
          console.log(usuario)
              console.log(nombre)
              console.log(password2)
      //Verificamos que el user no este registrado en la DB
      let verify = await DB.usuarios.findOne({
        where: {
          email: req.body.email,
        },
      });
      !!verify?res.send("Ya estas registrado/a"):"";
  //verificamos las contraseñas
  if (password === password2) {
      let  passwordEncriptada = bcrypt.hashSync(password, 10);
        console.log(passwordEncriptada )
 //Creamos al usuario
       let  user = await DB.usuarios.create({
          usuario: usuario,
          nombre:nombre,
          email: email,
          password: passwordEncriptada,
        });
    
   let token;
      //(bcrypt.compareSync(password, user.password))
      !user
        ? res.send("No pudo crearse el usuario intentelo mas tarde , gracias ")
        : // Creamos el token
          token = await jwt.sign({ user: user }, "penalty", {
            expiresIn: 3600,
          });
      res.json({
        user: user,
        token: token,
      });
    
    }else{res.send('Las contraseñas no son iguales')}
      } catch (error) {
      res.send(error);
    }
  },
  /*Log in*/

  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      // Buscar usuario
      let user = await DB.usuarios.findOne({
        where: {
          email:email ,
        },
      });
   let passwordCompared = bcrypt.compareSync(password, user.password)
   console.log(passwordCompared,'65')
      let token;
      !user && !passwordCompared
        ? res.send("usuario no existe")
        : // Creamos el token
          (token = await jwt.sign({ user: user }, "penalty", {
            expiresIn: 3600,
          }));
      res.json({
        user: user,
        token: token,
      })
    } catch (error) {
      res.send(error);
    }
  },
};

//falta agregar la contraseña  modificar un poco mas el login
module.exports = usersController;
