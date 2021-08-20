"use strict";
module.exports = (sequelize, DataTypes) => {
  const preciokms = sequelize.define(
    "preciokms",
    {
      precio: DataTypes.DECIMAL,
    },
    {}
  );
  preciokms.associate = function (models) {
   
  };
  return preciokms;
};
