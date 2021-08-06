'use strict';
module.exports = (sequelize, DataTypes) => {
  const inhab = sequelize.define('inhab', {
    vendedor: DataTypes.INTEGER,
    cliente: DataTypes.INTEGER,
    razonsoc: DataTypes.STRING,
    fecinhab: DataTypes.STRING,
    motivo: DataTypes.STRING,

  }, {timestamps:false,freezeTableName: true,});
  inhab.associate = function(models) { };
  inhab.removeAttribute('id');
  return inhab;
};
