const path = require("path");
const DB = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//cloudinary
var cloudinary = require("cloudinary").v2;
//config cloudinary
cloudinary.config({
  cloud_name: 'dtabhpdet',
  api_key: '177248816949724',
  api_secret:'wpeSwtO3MOHwwM58RFNf2BgYA9M',
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
  todosGastos:async (req, res) => {
    try {
      let result = await DB.gastos.findAll({include:['formapago','usuario']});
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  },
  todoAnt:async (req, res) => {
    try {
      let result = await DB.anticipos.findAll();
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  },
  allusers: async (req, res) => {
    try {
      let result = await DB.usuarios.findAll({
        include:['anticipo','vacacion','gasto','departamento']
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
      const {usuId}=data
      console.log(usuId,'soy el id del usuario');
   

      
      //crea el anticipo y lo relacion con el usuario
      const anticipoCreado = await DB.anticipos.create(data);
      await DB.usuarios.update({anticipoId:anticipoCreado.id},{
        where:{
          id:usuId
        }
      })
      res.send("ok");
    } catch (error) {
      res.send(error);
    }
  },
  allvacaciones:async (req, res) => {
try {
 /* let result = await DB.usuarios.findAll({
    include:["anticipo"]
  });*/
  let result= await DB.vacaciones.findAll()
  res.send(result)
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
  let result= await DB.diasvacaciones.findAll()
  res.send(result)
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
        let result = await DB.gerentes.findAll({include:['departamento']})
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
  antpagos:async (req, res) => {
    try {
      const data=req.body
      console.log(data,'208');
     await DB.gastos.create(data);
      res.send('se creo correctamente');
    } catch (error) {
      res.send(error);
    }
  },
  gastos:async (req, res) => {
  try {
    const { id } = req.params;
    const data=req.body
    const {importe,notas,categoria}=data
    const img=req.file
    const imgPath=img.path
 console.log(id,'soy el id');
 console.log(data,'soy data ');
 console.log(img,'soy img');
 console.log(imgPath,'soy imgPath');
let imagenURL = await cloudinary.uploader.upload(imgPath);
    console.log(imagenURL.secure_url,'soy imagenURL');
  let a= await DB.gastos.update(  {
      importe:importe,
      imagen:imagenURL.secure_url
    },
    {
      where:{
        id:id
      }
    }); 
    console.log(a); 
    res.send('ok');

  } catch (error) {
    res.send(error);
  }
  },
  editarRendicion:async (req, res) => {
    try {
      // id del producto
      const { id } = req.params;
      let gastos = await DB.gastos.findByPk(id);
      res.send(gastos)
    } catch (error) {
    res.send(error);
      
    }
  },
  usuarioPK:async (req, res) => {
    try {
      // id del producto
      const { id } = req.params;
      let usuario = await DB.usuarios.findByPk(id,{
        include:['anticipo','vacacion','gasto','departamento']
    });
      res.send(usuario)
    } catch (error) {
    res.send(error);
      
    }
  },
  crearGasto:async (req, res) => {
    try {
      const file= req.file
      console.log(file,'soy file*****************************');
      const imgPath=file.path
      const imagenURL = await cloudinary.uploader.upload(imgPath);
      const imagenSecure = imagenURL.secure_url

      const data= req.body
       console.log( data , 'soy data *******************');

      let usuario = await DB.gastos.create({...data,imagen:imagenSecure});
      res.send(usuario)
    } catch (error) {
    res.send(error);
      
    }
  }
};

module.exports = usersController;
