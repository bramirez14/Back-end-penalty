'use strict';
module.exports = (sequelize, DataTypes) => {
  const factmes = sequelize.define('factmes', {
    
    vendedor: DataTypes.INTEGER,
    numctacte: DataTypes.INTEGER,
    razonsoc: DataTypes.STRING,
    unidades: DataTypes.INTEGER,
    importe:DataTypes.DECIMAL,

  }, {timestamps:false});
  factmes.associate = function(models) {
 
  }
  return factmes;
};
