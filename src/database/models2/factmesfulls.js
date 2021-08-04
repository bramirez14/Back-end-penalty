'use strict';
module.exports = (sequelize, DataTypes) => {
  const factmesfulls = sequelize.define('factmesfulls', {
    
    categoria: DataTypes.STRING,
    unidades: DataTypes.INTEGER,
    importe:DataTypes.DECIMAL,

  }, {timestamps:false});
  factmesfulls.associate = function(models) {
 
  }
  return factmesfulls;
};
