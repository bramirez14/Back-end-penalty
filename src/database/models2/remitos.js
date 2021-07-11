'use strict';
module.exports = (sequelize, DataTypes) => {
  const remitos = sequelize.define('remitos', {
    cliente: DataTypes.BIGINT,
    razonsoc: DataTypes.STRING,
    vendedor: DataTypes.INTEGER,
    apeynom: DataTypes.STRING,
    fecemision:DataTypes.DATE,
    PEDIDO: DataTypes.STRING,
    REMITO:DataTypes.STRING,
    ESTADO:DataTypes.STRING,
    UNIDADES:DataTypes.DOUBLE,
    pdf:DataTypes.STRING,

  }, {timestamps:false});
  remitos.associate = function(models) {
    
 
  }
  return remitos;
};
