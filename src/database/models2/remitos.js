'use strict';
module.exports = (sequelize, DataTypes) => {
  const remitos = sequelize.define('remitos', {
    cliente: DataTypes.INTEGER,
    razonsoc: DataTypes.STRING,
    vendedor: DataTypes.INTEGER,
    PEDIDO: DataTypes.STRING,
    a:DataTypes.STRING,
    
  }, {timestamps:false});
  remitos.associate = function(models) {
    
 
  }
  return remitos;
};
