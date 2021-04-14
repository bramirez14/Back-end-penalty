'use strict';
module.exports = (sequelize, DataTypes) => {
  const departamentos = sequelize.define('departamentos', {
    departamento: DataTypes.STRING,
    gerenteId: DataTypes.INTEGER,
  }, {});
  departamentos.associate = function(models) {
     departamentos.belongsTo(models.gerentes,{
        as:'gerente'
    })  
      departamentos.hasMany(models.usuarios,{
        as:'usuario',
        foreignKey:'departamentoId'
      })  
  }
  return departamentos;
};
