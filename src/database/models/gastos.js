'use strict';
module.exports = (sequelize, DataTypes) => {
  const gastos = sequelize.define('gastos', {
    importe: DataTypes.DECIMAL,
    msj: DataTypes.STRING,
    uid: DataTypes.INTEGER,
    idPago:DataTypes.INTEGER
  
  }, {});
  gastos.associate = function(models) {
    gastos.belongsTo(models.usuarios,{
        as:'usu'
      }),
      gastos.belongsTo(models.formapagos,{
        as:'pago'
      })
      

  }
  return gastos;s
};
