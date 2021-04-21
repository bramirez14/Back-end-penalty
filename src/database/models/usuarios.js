'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuarios = sequelize.define('usuarios', {
    usuario: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    tipousuario: DataTypes.STRING,
    categoria:DataTypes.STRING,
    nvendedor: DataTypes.STRING,
    fechaContratacion:DataTypes.STRING,
    departamentoId:DataTypes.INTEGER,
    anticipoId:DataTypes.INTEGER,
  }, {});
usuarios.associate = function(models) {
  usuarios.belongsTo(models.anticipos,{
    as:'anticipo',
   
  }),
  usuarios.hasMany(models.vacaciones,{
    as:'vacacion',
    foreignKey:'usuarioId'
  }),
  usuarios.hasMany(models.gastos,{
    as:'gasto',
    foreignKey:'usuarioId'
  })
  usuarios.belongsTo(models.departamentos,{
      as:'departamento'
    }),
    usuarios.hasMany(models.rendiciones,{
      as:'rendicion',
      foreignKey:'usuarioId'
    })

  };
  return usuarios;
};
