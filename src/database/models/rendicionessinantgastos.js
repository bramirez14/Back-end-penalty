"use strict";

module.exports = (sequelize, DataTypes) => {
  const rendicionessinantgastos = sequelize.define(
    "rendicionessinantgastos",
    {
      nota: DataTypes.STRING,
      importe: DataTypes.DECIMAL,
      fecha: DataTypes.STRING,
      imagen: DataTypes.STRING,
      categoria: DataTypes.STRING,
      estado:DataTypes.STRING,
      estadoFinal:DataTypes.STRING,
      notification:DataTypes.STRING,
      usuarioId: DataTypes.INTEGER,
    },
    {}
  );
  rendicionessinantgastos.associate = function (models) {
    rendicionessinantgastos.belongsTo(models.usuarios, {
        as: "usuario",
      });
    
  };
  return rendicionessinantgastos;
};
