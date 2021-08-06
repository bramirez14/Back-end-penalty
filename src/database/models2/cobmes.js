'use strict';
module.exports = (sequelize, DataTypes) => {
  const cobmes = sequelize.define('cobmes', {
    vendedor: DataTypes.INTEGER,
    cliente: DataTypes.STRING,
    razonsoc: DataTypes.STRING,
    cobranza: DataTypes.DECIMAL,
    comision: DataTypes.DECIMAL,
  
  }, {timestamps:false});
  cobmes.associate = function(models) {
    
 
  }
  return cobmes;
};
