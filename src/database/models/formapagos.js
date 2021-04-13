'use strict';
module.exports = (sequelize, DataTypes) => {
  const formapagos = sequelize.define('formapagos', {
    pago: DataTypes.STRING,
   
  
  }, {});
  formapagos.associate = function(models) {
    formapagos.hasMany(models.gastos,{
        as:'gasto'
      })
  }
  return formapagos;
};
