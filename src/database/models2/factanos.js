'use strict';
module.exports = (sequelize, DataTypes) => {
  const factanos = sequelize.define('factanos', {
    
    categoria: DataTypes.STRING,
    unidades: DataTypes.INTEGER,
    importe:DataTypes.DECIMAL,

  }, {timestamps:false});
  factanos.associate = function(models) {
 
  }
  return factanos;
};
