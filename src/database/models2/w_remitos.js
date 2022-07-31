'use strict';
module.exports = (sequelize, DataTypes) => {
  const w_remitos = sequelize.define('w_remitos', {
    cliente: DataTypes.STRING,
    razonsoc: DataTypes.STRING,
    vendedor: DataTypes.INTEGER,
    PEDIDO: DataTypes.STRING,
    fecemision:DataTypes.STRING,
    apeynom:DataTypes.STRING,
    UNIDADES:DataTypes.INTEGER,
    REMITO:DataTypes.STRING,
    ESTADO: DataTypes.STRING,
    pdf:DataTypes.STRING,
    //fechafin: DataTypes.STRING,
  }, {timestamps:false});
  remitos.associate = function(models) {
  }
  return w_remitos;
};
