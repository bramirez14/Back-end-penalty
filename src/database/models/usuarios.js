'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuarios = sequelize.define('usuarios', {
    usuario: DataTypes.STRING,
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    tipousuario: DataTypes.STRING,
    categoria:DataTypes.STRING,
    nvendedor: DataTypes.STRING,
    fechaContratacion:DataTypes.STRING,
    condicion:DataTypes.STRING,
    periodoPendiente:DataTypes.INTEGER,
    departamentoId:DataTypes.INTEGER
     
  }, {});
usuarios.associate = function(models) {
  usuarios.hasMany(models.anticipos,{
    as:'anticipo',
    foreignKey:'usuarioId'
  }),
  usuarios.hasMany(models.vacaciones,{
    as:'vacacion',
    foreignKey:'idusuario'
  }),
    usuarios.belongsTo(models.departamentos,{
        as:'departamento'
      })
  

  };
  return usuarios;
};
