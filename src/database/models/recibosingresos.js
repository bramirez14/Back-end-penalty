'use strict';
module.exports = (sequelize, DataTypes) => {
  const recibosingresos = sequelize.define('recibosingresos', {
    mpago: DataTypes.STRING,
    cheque: DataTypes.STRING,
    fecha: DataTypes.STRING,
    importe: DataTypes.DECIMAL,
    nvendedor: DataTypes.INTEGER,
    nombrecompleto:DataTypes.STRING,
    numerorecibo: DataTypes.STRING,
    ncomprobante:DataTypes.STRING,
    razonsocial: DataTypes.STRING,
    
  }, { });
  recibosingresos.associate = function(models) {
    
 
  }
  return recibosingresos;
};
