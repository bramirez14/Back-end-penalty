'use strict';
module.exports = (sequelize, DataTypes) => {
  const ctacte = sequelize.define('ctacte', {
      cliente: DataTypes.STRING,
    razonsoc: DataTypes.STRING,
    vendedor: DataTypes.INTEGER,
    apeynom: DataTypes.STRING,
    fecemision: DataTypes.STRING,
    fecvenc: DataTypes.STRING,
    cabeza: DataTypes.INTEGER,
    codcabeza:DataTypes.INTEGER,
    aplicado: DataTypes.INTEGER,
    codaplicad:DataTypes.INTEGER,
    totalml: DataTypes.DECIMAL,
    saldoml: DataTypes.DECIMAL,
    pdf: DataTypes.STRING,
  }, {timestamps:false,freezeTableName: true,});
  ctacte.associate = function(models) { };
  ctacte.removeAttribute('id');
  return ctacte;
};
