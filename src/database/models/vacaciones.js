'use strict';
module.exports = (sequelize, DataTypes) => {
  const vacaciones = sequelize.define('vacaciones', {
    periodo: DataTypes.INTEGER,
    fechaSolicitud: DataTypes.STRING,
    fechaDesde: DataTypes.STRING,
    fechaHasta:DataTypes.STRING,
    obs: DataTypes.STRING,
    diasFaltantes:DataTypes.INTEGER,
    usuarioId:DataTypes.INTEGER,
    estado: DataTypes.STRING,
    estadoFinal:DataTypes.STRING,
    respMensaje:DataTypes.STRING,
    notificacion:DataTypes.STRING,
  }, {});
 vacaciones.associate = function(models) {
  vacaciones.belongsTo(models.usuarios,{
    as:'usuario'
  }) 

}
  return vacaciones;
};
