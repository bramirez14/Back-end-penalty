'use strict';
module.exports = (sequelize, DataTypes) => {
  const anticipos = sequelize.define('anticipos', {
    sueldo: DataTypes.STRING,
    cuotas: DataTypes.INTEGER,
    importe: DataTypes.DECIMAL,
    fecha:DataTypes.STRING,
    mensaje: DataTypes.STRING,
  }, {});
  anticipos.associate = function(models) {
    anticipos.hasMany(models.usuarios,{
      as:'usuario',
      foreignKey:'anticipoId'

    }) 
 
  }
  return anticipos;
};
