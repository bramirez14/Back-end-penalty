'use strict';
module.exports = (sequelize, DataTypes) => {
  const anticipos = sequelize.define('anticipos', {
    sueldo: DataTypes.STRING,
    cuotas: DataTypes.INTEGER,
    importe: DataTypes.DECIMAL,
    fecha:DataTypes.STRING,
    mensaje: DataTypes.STRING,
    usuId: DataTypes.INTEGER,
  }, {});
  anticipos.associate = function(models) {
    anticipos.belongsTo(models.usuarios,{
        as:'usuario2'
      })
  }
  return anticipos;
};
