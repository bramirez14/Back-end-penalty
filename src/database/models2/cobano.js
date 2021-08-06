'use strict';
module.exports = (sequelize, DataTypes) => {
  const cobano = sequelize.define( 'cobano', {
    vendedor: DataTypes.INTEGER,
    ano: DataTypes.INTEGER,
    cliente: DataTypes.STRING,
    mes:DataTypes.INTEGER,
    razonsoc: DataTypes.STRING,
    cobranza: DataTypes.DECIMAL,
    comision: DataTypes.DECIMAL,
  
  }, {timestamps:false,freezeTableName: true,});
 cobano.associate = function(models) { };
 cobano.removeAttribute('id');
  return cobano;
};
