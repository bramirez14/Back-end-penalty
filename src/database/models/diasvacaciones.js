'use strict';
module.exports = (sequelize, DataTypes) => {
  const diasvacaciones = sequelize.define('diasvacaciones', {
    dias: DataTypes.INTEGER,
    
     
  }, {});
diasvacaciones.associate = function(models) {
  diasvacaciones.hasMany(models.vacaciones,{
    as:'vacacion_dia',
    foreignKey:'idDiasVacacionesPendientes'
  })
  };
  return diasvacaciones;
};
