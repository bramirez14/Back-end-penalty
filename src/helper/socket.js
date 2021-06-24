const DB = require("../database/models");
const jwt = require('jsonwebtoken');

const usuarioConectado =async (id)=>{
        let res = await DB.usuarios.findByPk(id, {
          include: ["anticipo", "vacacion", "gasto", "departamento"],
        });
        await DB.usuarios.update(
          {conectado:'SI'},
          {
            where: { id: id },
          }
        )
       return res
}
const usuariosConectados= async ()=>{
  let res = await DB.usuarios.findAll({
          include: ["anticipo", "vacacion", "gasto", "departamento"],
        });
      return res

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
  let res = await DB.usuarios.findByPk(id, {
    include: ["anticipo", "vacacion", "gasto", "departamento"],
  });
  await DB.usuarios.update(
    {conectado:'NO'},
    {
      where: { id: id },
    }
  )
 return res
}
module.exports = {
    usuariosConectados,
    usuarioConectado,
    comprobarJWT,
    usuarioDesconectado,
    
}
