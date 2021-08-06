'use strict';
module.exports = (sequelize, DataTypes) => {
  const factcli = sequelize.define('factcli', {
    razonsoc: DataTypes.STRING,
    vendedor: DataTypes.INTEGER,
    importe: DataTypes.DECIMAL,
    numctacte: DataTypes.INTEGER,
    unidades: DataTypes.DECIMAL,
  }, {timestamps:false,freezeTableName: true,});
  factcli.associate = function(models) { }
  factcli.removeAttribute('id');
  return factcli;
};
