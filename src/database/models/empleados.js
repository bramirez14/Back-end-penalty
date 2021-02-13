'use strict';
module.exports = (sequelize, DataTypes) => {
  const empleados= sequelize.define('empleados', {
    nombre: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING,
    email: DataTypes.STRING,
   
    
  }, {});
empleados.associate = function(models) {
   
  };
  return empleados;
};