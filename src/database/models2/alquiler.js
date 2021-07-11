'use strict';
module.exports = (sequelize, DataTypes) => {
  const alquiler = sequelize.define('alquiler', {
    nombre: DataTypes.STRING,
    retiro: DataTypes.STRING,
    fecharetiro: DataTypes.INTEGER,
 
    

  }, {timestamps:false});
  alquiler.associate = function(models) {
    
 
  }
  return alquiler;
};
