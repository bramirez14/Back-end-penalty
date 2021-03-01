'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuarios = sequelize.define('usuarios', {
    usuario: DataTypes.STRING,
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    tipousuario: DataTypes.STRING,
    nvendedor: DataTypes.STRING,
    fechaContratacion:DataTypes.STRING    
  }, {});
usuarios.associate = function(models) {
  usuarios.hasMany(models.anticipos,{
    as:'anticipo',
    foreignKey:'usuarioId'
  }),
  usuarios.hasMany(models.vacaciones,{
    as:'vacacion',
    foreignKey:'idusuario'
  })

  };
  return usuarios;
};
