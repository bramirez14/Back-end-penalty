'use strict';
module.exports = (sequelize, DataTypes) => {
  const remmes = sequelize.define('remmes', {
    razonsoc: DataTypes.STRING,
    vendedor: DataTypes.INTEGER,
    importe: DataTypes.DECIMAL,
    numctacte: DataTypes.INTEGER,
    unidades: DataTypes.DECIMAL
  }, {timestamps:false});
  remmes.associate = function(models) {
    
 
  }
  return remmes;
};
