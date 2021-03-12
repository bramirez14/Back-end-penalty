'use strict';
module.exports = (sequelize, DataTypes) => {
  const vacaciones = sequelize.define('vacaciones', {
    periodo: DataTypes.INTEGER,
    fechaSolicitud: DataTypes.INTEGER,
    fechaDesde: DataTypes.DECIMAL,
    fechaHasta:DataTypes.STRING,
    dias: DataTypes.INTEGER,
    obs: DataTypes.STRING,
    diasFaltantes:DataTypes.INTEGER,
    idusuario:DataTypes.INTEGER
  }, {});
 vacaciones.associate = function(models) {
   vacaciones.belongsTo(models.usuarios,{
        as:'usuario2'
      })
  }
  return vacaciones;
};
