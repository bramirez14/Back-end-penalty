'use strict';
module.exports = (sequelize, DataTypes) => {
  const kilometros = sequelize.define('kilometros', {
    kmTotal: DataTypes.DECIMAL,
    importeTotal:DataTypes.DECIMAL,
    imagen: DataTypes.STRING,
    usuarioId: DataTypes.INTEGER,
  }, { });
  kilometros.associate = function (models) {
    kilometros.belongsTo(models.usuarios, {
      as: "usuario",
    });
    kilometros.hasMany(models.rendicionesKms, {
      as: "rendicionKm",
    foreignKey:'kilometroId'
    });
  };
  return kilometros;
};
