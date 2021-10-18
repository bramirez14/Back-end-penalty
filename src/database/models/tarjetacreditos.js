"use strict";

module.exports = (sequelize, DataTypes) => {
  const tarjetacreditos = sequelize.define(
    "tarjetacreditos",
    {
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
      archivo: DataTypes.STRING,
    },
    {}
  );
  tarjetacreditos.associate = function (models) {
  
   
  };
  return tarjetacreditos;
};
