const express = require("express");
const path = require("path");
const fs = require("fs");
const DB = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pdf = require("html-pdf");
var options = { format: "A4" };
const { v4: uuidv4 } = require('uuid');


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
const db = require("../database/models2");

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
        res.send({ message: "Ya estas registrado/a", status: 500 });
      } else {
        //verificamos las contraseñas
        if (password === password2) {
          encryptedKey = bcrypt.hashSync(password, 10);
          //Creamos al usuario
          let user = await DB.usuarios.create({
            ...data,
            password: encryptedKey,
            email: e,
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
      !!user?
       await DB.usuarios.update({conectado},{
        where: {
          id: user.id,
        },
      }):'';
    
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
  cambiarContraña:async (req, res) => {
    const {id,password}=req.body;
    const passwordNew=bcrypt.hashSync(password, 10);
     await DB.usuarios.update({password:passwordNew},{
      where: {
        id
      },
    });
    res.send('ok')
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
      //crea el anticipo y lo relacion con el usuario
    estado:'pendiente'
      const anticipoCreado = await DB.anticipos.create({...data,estado:'pendiente',estadoFinal:'pendiente'});

      res.send(anticipoCreado);
    } catch (error) {
      res.send(error);
    }
  },
  anticipoRechazado: async (req, res) => {
    const { id } = req.params;
    console.log(id);

    const data  = req.body;
    console.log(data);
    try {
      let antEditado = await DB.anticipos.update(
        {respMensaje},
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
    const data = req.body;
    console.log(req.body);
    try {
      let antEditado = await DB.anticipos.update(
        data,
        {
          where: { id: id },
        }
      );
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  alerta: async (req, res) => {
    const datos =req.body
    const arraySueldos=datos[0].map(s=> s.id)
    for (const dato of arraySueldos) {
      await DB.anticipos.update({notificacion:'activa'},{where:{id:dato}})}

     const arrayVacaciones=datos[1].map(v=> v.id)
     for (const dato of arrayVacaciones) {
      await DB.vacaciones.update({notificacion:'activa'},{where:{id:dato}})}

    const arrayGastos=datos[2].map(g=> g.id)
    for (const dato of arrayGastos) {
      await DB.gastos.update({notificacion:'activa'},{where:{id:dato}})}
  
  res.send('ok')
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
      let result = await DB.vacaciones.findAll({include:["usuario"]});
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
    console.log(id);

    const data  = req.body;
    console.log(data);
    try {
      let antEditado = await DB.vacaciones.update(
        data,
        {
          where: { id: id },
        }
      );
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  vacacionesAprobado: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    console.log(req.body);
    try {
      let antEditado = await DB.vacaciones.update(
        data,
        {
          where: { id: id },
        }
      );
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
 borrarVacacion:async (req, res) => {
   try {
  const { id } = req.params;
  console.log(id);
      await DB.vacaiones.destroy({
      where: { id },
    });
    res.send("ok")
 } catch (e) {
  res.send(e);
 }},
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
     const {gastoId,total}=data
console.log(data);
      if(file===undefined){
        await crearRendicion(data)
        await DB.gastos.update({
          importerendido:total},{
            where: {
              id: gastoId,
            },
          })
      }else{
        const filePath = file.path;
        //guardamos imagen en cloudinary y DB
        let imagenURL = await cloudinary.uploader.upload(filePath);
        await crearRendicion({ ...data, imagen: imagenURL.secure_url });
      }
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
      await DB.gastos.create({...data,importerendido:data.importe});
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
      const {gastoId,total}=data

      await DB.rendiciones.update(data, {
        where: {
          id: id,
        },
      });
      await DB.gastos.update({importerendido:total}, {
        where: {
          id:gastoId,
        },
      });
      res.send("ok");
    } catch (error) {
      res.send(error);
    }
  },
  gastoRechazado: async (req, res) => {
    const { id } = req.params;
    console.log(id);

    const data  = req.body;
    console.log(data);
    try {
      let antEditado = await DB.gastos.update(
        data,
        {
          where: { id: id },
        }
      );
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  gastoAprobado: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    console.log(req.body);
    try {
      let antEditado = await DB.gastos.update(
        data,
        {
          where: { id: id },
        }
      );
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  borrarGasto:async (req, res) => {
    try {
   const { id } = req.params;
   console.log(id);
       await DB.gastos.destroy({
       where: { id },
     });
     res.send("ok")
  } catch (e) {
   res.send(e);
  }},



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
  gastoFinalizados : async (req, res) => {
  try {
    const { id } = req.params;
    const {listo} = req.body
    console.log(id);
    await DB.gastos.update({listo},{where:{id}});

    res.send('ok')
  } catch (e) {
    res.send(e)
  }
  },
  verificacionGasto:async (req, res) => {

    try {
      const { id } = req.params;
    const {aprobacion}=req.body;
    await DB.gastos.update({aprobacion},{where:{id}});
      res.send('ok')
    } catch (e) {
      res.send(e)
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
  agregarImgUsuario:async (req, res) => {
    try {
      const { id } = req.params;
    console.log(id);
      const img = req.file;
      console.log(img);
      const imgPath = img.path;
      let imagenURL = await cloudinary.uploader.upload(imgPath);
      console.log(imagenURL);
      let imgCreada = await DB.usuarios.update(
        { imagen: imagenURL.secure_url },
        {
          where: {
            id: id,
          },
        })
        res.send('ok')
    } catch (e) {
      res.send(e)
    }
  },
  cerrarSesion:async (req, res) => {
try {
  const { id } = req.params;
  const {conectado}=req.body
  await DB.usuarios.update({conectado},{where:{id}})
    res.send('ok')
} catch (e) {
  res.send(e)
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
    
if(img===undefined){
 const {id} = await DB.gastos.create(data)
  await DB.rendiciones.create({
    ...data,
    gastoId: id,
  })
}else{
  const imgPath = img.path;
  let imagenURL = await cloudinary.uploader.upload(imgPath);
  const { categoria, fecha, importe, notas, usuarioId, formapagoId,sinAnticipo,estado,estadoFinal,notificacion,importerendido} = data;
  const gasto = await DB.gastos.create(data);
  console.log(gasto,'soy la linea 617');
  const id = gasto.id;
   await DB.rendiciones.create({
    ...data,
    gastoId: id,
    imagen: imagenURL.secure_url,
  });
}
      res.send("ok");
    } catch (e) {
      res.send(e);
    }
  },
  finalizar:async (req, res) => {
    try {
      const {id}= req.params
      const {procesoFinalizado} = req.body;
      await DB.gastos.update({procesoFinalizado},{where:{id}})
      res.send('ok')
    } catch (e) {
      res.send(e);
    }
  },
  pagoAnt: async (req, res) => {
    const {id}=req.params;
    const {pagoRealizado}=req.body;
    await DB.anticipos.update({pagoRealizado},{where:{id}})
    res.send('ok')
  },
  pagoGasto: async (req, res) => {
    const {id}=req.params;
    const {filename}=req.file
    const {pagoRealizado}=req.body;
    await DB.gastos.update({pagoRealizado,pdfinal:filename},{where:{id}})
    res.send('ok')

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
    const deptos = await DB.departamentos.findByPk(departamentoId);
    const { departamento, gerenteId } = deptos;
    const gerente = await DB.gerentes.findByPk(gerenteId);
    const { nombre, apellido, email } = gerente;
    console.log(data);

    res.render(
      "pdf",
      { data, usuario, email, departamento, nombre, apellido, id,gasto},
      function (err, html) {
        pdf.create(html).toFile("result.pdf", function (err, result) {
          if (err) {
            return console.log(err,'error');
          } else {
              console.log(res,'respuesta'); 
            var datafile = fs.readFileSync("result.pdf");
            res.header("content-type", "application/pdf");
            res.send(datafile);
          }
        });
      }
    );
  },
  gastoPDF: async (req, res) => {
    try {
      const header = req.header("archivo");
    console.log(header);
    
    
    res.sendFile(path.join(__dirname,`../file/public/${header}`));
    } catch (error) {
      res.send(e)
    }
    

  },
  pd: async (req, res) => {
    console.log(path.join(__dirname)); //me trae hasta el controller ojo!! recorda que el public esta cubierto con ruta estatica
    res.sendFile(path.join(__dirname, "../../result.pdf"));
  },

  archivoPdf:async (req, res) => {
    try {
      console.log('estoy aca');
      const { id }= req.params;
      const {norden} = req.body
      const { filename} = req.file;
      await DB.gastos.update({pdf:filename,norden},{where: {id}})
      res.send('ok')
    } catch (e) {
      res.send(e)
    }
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
