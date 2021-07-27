"use strict";

module.exports = (sequelize, DataTypes) => {
  const rendicionesKms = sequelize.define(
    "rendicionesKms",
    {
      fecha: DataTypes.STRING,
      fechaKm: DataTypes.STRING,
      importeTotal: DataTypes.DECIMAL,
      KmI: DataTypes.DECIMAL,
      KmF: DataTypes.DECIMAL,
      KmRecorrido: DataTypes.DECIMAL,
      kilometroId: DataTypes.INTEGER,
    },
    {}
  );
  rendicionesKms.associate = function (models) {
    rendicionesKms.belongsTo(models.kilometros, {
      as: "kilometro",
    });
  };
  return rendicionesKms;
};
