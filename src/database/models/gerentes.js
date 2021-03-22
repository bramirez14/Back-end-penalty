'use strict';
module.exports = (sequelize, DataTypes) => {
  const gerentes = sequelize.define('gerentes', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {});
  gerentes.associate = function(models) {
    
  }
  return gerentes;
};
