'use strict';
module.exports = (sequelize, DataTypes) => {
  const alertas = sequelize.define('alertas', {
    alerta: DataTypes.STRING,//msj
    info: DataTypes.STRING,
    f: DataTypes.STRING,
    emisor: DataTypes.STRING,
    receptor: DataTypes.STRING,
    estado:DataTypes.STRING,
    nombre: DataTypes.STRING,
    path:DataTypes.STRING,
    usuarioId: DataTypes.INTEGER,
  }, {});
    alertas.associate = function(models) {
   
      alertas.belongsTo(models.usuarios,{
        as:'usuario',
      })
  };
  return alertas;
};
