'use strict';
module.exports = (sequelize, DataTypes) => {
  const anticipos = sequelize.define('anticipos', {
    sueldo: DataTypes.STRING,
    cuotas: DataTypes.INTEGER,
    importe: DataTypes.DECIMAL,
    fecha:DataTypes.STRING,
    mensaje: DataTypes.STRING,
    respMensaje:DataTypes.STRING,
    estado: DataTypes.STRING
  }, {});
  anticipos.associate = function(models) {
    anticipos.belongsTo(models.usuarios,{
      as:'usuario',
     
    })
 
  }
  return anticipos;
};
