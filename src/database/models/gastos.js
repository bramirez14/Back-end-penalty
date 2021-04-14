'use strict';
module.exports = (sequelize, DataTypes) => {
  const gastos = sequelize.define('gastos', {
    importe: DataTypes.DECIMAL,
    msj: DataTypes.STRING,
    usuarioId: DataTypes.INTEGER,
    //formapagoId:DataTypes.INTEGER
  
  }, {});
  gastos.associate = function(models) {
    gastos.belongsTo(models.usuarios,{
      as:'usuario'
    })
   
      

  }
  return gastos;
};
