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
    idDiasvacaciones:DataTypes.INTEGER,
    vacacionesId:DataTypes.INTEGER
  }, {});
 vacaciones.associate = function(models) {
   vacaciones.belongsTo(models.usuarios,{
        as:'usuario'
      }),
      vacaciones.belongsTo(models.diasvacaciones,{
        as:'vacaciones'
      })
  }
  return vacaciones;
};
