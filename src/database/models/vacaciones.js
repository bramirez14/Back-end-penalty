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
    f: DataTypes.STRING,//fecha cuando lo aprueba Cristian Rios
    fd: DataTypes.STRING,

  }, {});
 vacaciones.associate = function(models) {
  vacaciones.belongsTo(models.usuarios,{
    as:'usuario'
  })
      
  vacaciones.belongsTo(models.alertas,{
    as:'alerta',
  })  


}
  return vacaciones;
};
