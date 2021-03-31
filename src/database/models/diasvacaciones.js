'use strict';
module.exports = (sequelize, DataTypes) => {
  const diasvacaciones = sequelize.define('diasvacaciones', {
    dias: DataTypes.INTEGER,
    
     
  }, {});
diasvacaciones.associate = function(models) {
  diasvacaciones.hasMany(models.vacaciones,{
    as:'vacaciones_dias',
    foreignKey:'idDiasVacaciones'
  })
  };
  return diasvacaciones;
};
