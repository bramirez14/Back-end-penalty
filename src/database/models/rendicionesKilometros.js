"use strict";

module.exports = (sequelize, DataTypes) => {
  const rendicionesKms = sequelize.define(
    "rendicionesKms",
    {
      fechaSelect: DataTypes.STRING,
      importe: DataTypes.DECIMAL,
      KmI: DataTypes.DECIMAL,
      KmF: DataTypes.DECIMAL,
      KmRecorrido: DataTypes.DECIMAL,
      kilometroId: DataTypes.INTEGER,
      usuarioId:DataTypes.INTEGER,
      notas:DataTypes.STRING,
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
