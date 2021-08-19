const DB = require("../database/models");
const jwt = require('jsonwebtoken');

const usuarioConectado =async (id)=>{
        await DB.usuarios.update(
          {conectado:'SI'},
          {
            where: { id: id },
          }
        )
      
}
const usuariosConectados= async ()=>{
  let result = await DB.usuarios.findAll();
  return result
}
const gastos= async ()=>{
  let result = await DB.gastos.findAll({ include: { all: true } });
return result
}

const km= async ()=>{
  const resp = await DB.kilometros.findAll({ include: { all: true } });
return resp
}
const vacaciones= async ()=>{
  let result = await DB.vacaciones.findAll(({ include: { all: true } }));
      return result

}
const anticipo= async ()=>{
  let result = await DB.anticipos.findAll(({ include: { all: true } }));

      return result

}

const comprobarJWT = ( token = '' ) => {

  try {
    const decoded = jwt.verify(token, "penalty");

      return [ true, decoded.user.id];

  } catch (error) {
      return [ false, null ];
  }

}

const usuarioDesconectado = async( id ) => {
 /*  let res = await DB.usuarios.findByPk(id, {
    include: ["anticipo", "vacacion", "gasto", "departamento"],
  }); */
  await DB.usuarios.update(
    {conectado:'NO'},
    {
      where: { id: id },
    }
  )
 
}
module.exports = {
    usuarioConectado,
    usuariosConectados,
    comprobarJWT,
    usuarioDesconectado,
    gastos,
    km,
    vacaciones,
    anticipo,

    
}
