'use strict';
module.exports = (sequelize, DataTypes) => {
  const pendcli = sequelize.define('pendcli', {
    vendedor: DataTypes.INTEGER,
    cliente: DataTypes.INTEGER,
    razonsoc: DataTypes.STRING,
    pendiente: DataTypes.DECIMAL,
    importe: DataTypes.DECIMAL,
    
  }, {timestamps:false,freezeTableName: true,});
  pendcli.associate = function(models) { };
  pendcli.removeAttribute('id');
  return pendcli;
};
