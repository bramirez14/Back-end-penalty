'use strict';
module.exports = (sequelize, DataTypes) => {
  const recibosliquidaciones = sequelize.define('recibosliquidaciones', {
    fecha: DataTypes.STRING,
    factura: DataTypes.INTEGER,
    comprobante: DataTypes.INTEGER,
    importe: DataTypes.DECIMAL,
    nvendedor: DataTypes.INTEGER,
    nombrecompleto:DataTypes.STRING,
    numerorecibo: DataTypes.STRING,
    razonsocial: DataTypes.STRING,
    fechavencimiento: DataTypes.STRING,
    ncomprobante:DataTypes.STRING,
    cliente: DataTypes.STRING,
  }, { });
  recibosliquidaciones.associate = function(models) {
    
 
  }
  return recibosliquidaciones;
};
