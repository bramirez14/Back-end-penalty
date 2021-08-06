'use strict';
module.exports = (sequelize, DataTypes) => {
  const cargped = sequelize.define( 'cargped', {

    tipo:DataTypes.STRING,
    vendedor: DataTypes.INTEGER,
    cliente: DataTypes.STRING,
    razonsoc: DataTypes.STRING,
    nroped: DataTypes.STRING,
    fecinhab: DataTypes.STRING,
    fecha: DataTypes.STRING,
    pedido: DataTypes.INTEGER,
    asignado:DataTypes.INTEGER,
    facturado:DataTypes.INTEGER,

}, {timestamps:false, 
  freezeTableName: true,
});
 cargped.associate = function(models) { }
  cargped.removeAttribute('id');

  return cargped;
}
