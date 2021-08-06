'use strict';
module.exports = (sequelize, DataTypes) => {
  const pendcomp = sequelize.define('pendcomp', {
      
    entrega: DataTypes.STRING,
    pedido: DataTypes.STRING,
    vendedor: DataTypes.INTEGER,
    cliente: DataTypes.INTEGER,
    razonsoc: DataTypes.STRING,
    condventa: DataTypes.INTEGER,
    bonifica: DataTypes.DECIMAL,
    articulo:DataTypes.STRING,
    descrip:DataTypes.STRING,
    pendiente:DataTypes.DECIMAL,
    precio:DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,

  }, {timestamps:false,freezeTableName: true,});
  pendcomp.associate = function(models) { };
  pendcomp.removeAttribute('id');
  return pendcomp;
};
