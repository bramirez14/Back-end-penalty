'use strict';
module.exports = (sequelize, DataTypes) => {
  const remmes = sequelize.define('remmes', {
    razonsoc: DataTypes.STRING,
    vendedor: DataTypes.INTEGER,
    importe: DataTypes.DECIMAL,
    numctacte: DataTypes.STRING,
    unidades: DataTypes.INTEGER,
  }, {timestamps:false});
  remmes.associate = function(models) {
    
 
  }
  return remmes;
};
