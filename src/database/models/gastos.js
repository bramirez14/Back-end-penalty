"use strict";
module.exports = (sequelize, DataTypes) => {
  const gastos = sequelize.define(
    "gastos",
    {
      importe: DataTypes.DECIMAL,
      notas: DataTypes.STRING,
      fecha: DataTypes.STRING,
      usuarioId: DataTypes.INTEGER,
      formapagoId: DataTypes.INTEGER,
      estado:DataTypes.STRING,
      estadoFinal:DataTypes.STRING,
      notificacion:DataTypes.STRING
      
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
    gastos.hasMany(models.rendiciones, {
      as: "rendicion",
    foreignKey:'gastoId'
    });
  };
  return gastos;
};
