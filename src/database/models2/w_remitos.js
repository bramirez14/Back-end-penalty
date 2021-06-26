'use strict';
module.exports = (sequelize, DataTypes) => {
  const w_remitos = sequelize.define('w_remitos', {
    cliente: DataTypes.INTEGER,
    razonsoc: DataTypes.STRING,
    vendedor: DataTypes.INTEGER,
    PEDIDO: DataTypes.STRING,
    a:DataTypes.STRING,
    

  }, {timestamps:false});
  w_remitos.associate = function(models) {
    
 
  }
  return w_remitos;
};
