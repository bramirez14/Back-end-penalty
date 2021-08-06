'use strict';
module.exports = (sequelize, DataTypes) => {
  const stocks2 = sequelize.define('stocks2', {
      
    deposito: DataTypes.STRING,
    desc_dep: DataTypes.STRING,
    articulo:DataTypes.STRING,
    descrip:DataTypes.STRING,
    agrupmien: DataTypes.STRING,
    codtalle: DataTypes.INTEGER,
    unidades: DataTypes.INTEGER,
    talle00: DataTypes.INTEGER,
    talle01: DataTypes.INTEGER,
    talle02: DataTypes.INTEGER,
    talle03: DataTypes.INTEGER,
    talle04: DataTypes.INTEGER,
    talle05: DataTypes.INTEGER,
    talle06: DataTypes.INTEGER,
    talle07: DataTypes.INTEGER,
    talle08: DataTypes.INTEGER,
    talle09: DataTypes.INTEGER,
    talle10: DataTypes.INTEGER,
    talle11: DataTypes.INTEGER,
    talle12: DataTypes.INTEGER,
    talle13: DataTypes.INTEGER,
    talle14: DataTypes.INTEGER,

  }, {timestamps:false});
  stocks2.associate = function(models) {
    
 
  }
  return stocks2;
};
