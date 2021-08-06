'use strict';
module.exports = (sequelize, DataTypes) => {
  const factcomp = sequelize.define('factcomp', {
    fecemision: DataTypes.STRING,
    codigo:DataTypes.INTEGER,
    numeromov: DataTypes.INTEGER,
    numctacte: DataTypes.INTEGER,
    razonsoc: DataTypes.STRING,
    vendedor: DataTypes.INTEGER,
    condventa:DataTypes.INTEGER,
    bonifica:DataTypes.DECIMAL,
    articulo:DataTypes.STRING,
    descrip:DataTypes.STRING,
    unidades: DataTypes.DECIMAL,
    precio:DataTypes.DECIMAL,
    importe:DataTypes.DECIMAL,
    iva:DataTypes.DECIMAL,
    bonificacion: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,

  }, {timestamps:false,freezeTableName: true,});
  factcomp.associate = function(models) { };
  factcomp.removeAttribute('id');
  return factcomp;
};
