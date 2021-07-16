'use strict';
module.exports = (sequelize, DataTypes) => {
  const remitos = sequelize.define('remitos', {
    cliente: DataTypes.INTEGER,
    razonsoc: DataTypes.STRING,
    vendedor: DataTypes.INTEGER,
    PEDIDO: DataTypes.STRING,
    fecemision:DataTypes.STRING,
    apeynom:DataTypes.STRING,
    UNIDADES:DataTypes.INTEGER,
    REMITO:DataTypes.STRING,
  }, {timestamps:false});
  remitos.associate = function(models) {
    
 
  }
  return remitos;
};
