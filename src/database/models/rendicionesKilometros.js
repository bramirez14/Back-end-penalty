"use strict";

module.exports = (sequelize, DataTypes) => {
  const rendicioneskms = sequelize.define(
    "rendicioneskms",
    {
      fechaSelect: DataTypes.STRING,
      importe: DataTypes.DECIMAL,
      KmI: DataTypes.DECIMAL,
      KmF: DataTypes.DECIMAL,
      KmRecorrido: DataTypes.DECIMAL,
      kilometroId: DataTypes.INTEGER,
      usuarioId:DataTypes.INTEGER,
      nota:DataTypes.STRING,
    },
    {}
  );
  rendicioneskms.associate = function (models) {
    rendicioneskms.belongsTo(models.kilometros, {
      as: "kilometro",
    });
   
  };
  return rendicioneskms;
};
