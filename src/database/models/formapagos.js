'use strict';
module.exports = (sequelize, DataTypes) => {
  const formapagos = sequelize.define('formapagos', {
    pago: DataTypes.STRING,
   
  
  }, {   timestamps:false });
  formapagos.associate = function(models) {
    /* formapagos.hasMany(models.gastos,{
        as:'gasto'
      }) */
  }
  return formapagos;
};
