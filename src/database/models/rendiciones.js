"use strict";

module.exports = (sequelize, DataTypes) => {
  const rendiciones = sequelize.define(
    "rendiciones",
    {
      fecha: DataTypes.STRING,
      notas: DataTypes.STRING,
      importe: DataTypes.DECIMAL,
      imagen: DataTypes.STRING,
      categoria: DataTypes.STRING,
      gastoId: DataTypes.INTEGER,
    },
    {}
  );
  rendiciones.associate = function (models) {
  
    rendiciones.belongsTo(models.gastos, {
      as: "gasto",
    });
  };
  return rendiciones;
};
