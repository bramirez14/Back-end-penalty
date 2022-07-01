'use strict';
module.exports = (sequelize, DataTypes) => {
  const formaspagoscreditos = sequelize.define('formaspagoscreditos', {
    tarjeta: DataTypes.STRING,
  
  }, {   timestamps:false });
  formaspagoscreditos.associate = function(models) {
    /*  formaspagoscreditos.hasMany(models.gastos,{
        as:'gasto',
        foreignKey:'formapagoId'
        
      })  */
  }
 return formaspagoscreditos;
};
