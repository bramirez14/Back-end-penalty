"use strict";
module.exports = (sequelize, DataTypes) => {
  const gastos = sequelize.define(
    "gastos",
    {
      importe: DataTypes.DECIMAL,
      notas: DataTypes.STRING,
      categoria: DataTypes.STRING,
      fecha: DataTypes.STRING,
      imagen : DataTypes.STRING,
      usuarioId: DataTypes.INTEGER,
      formapagoId: DataTypes.INTEGER,
    },
    {}
  );
  gastos.associate = function (models) {
    gastos.belongsTo(models.usuarios, {
      as: "usuario",
    });
    gastos.belongsTo(models.formapagos, {
      as: "formapago",
    });
  };
  return gastos;
};
