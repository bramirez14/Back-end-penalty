'use strict';
module.exports = (sequelize, DataTypes) => {
  const factano= sequelize.define('factano', {
    
    categoria: DataTypes.STRING,
    unidades: DataTypes.INTEGER,
    importe:DataTypes.DECIMAL,

  }, {timestamps:false,freezeTableName: true,});
  factano.associate = function(models) { }
  factano.removeAttribute('id');
  return factano;
};
