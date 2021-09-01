'use strict';
module.exports = (sequelize, DataTypes) => {
  const kilometros = sequelize.define('kilometros', {
    kmTotal: DataTypes.DECIMAL,
    importeTotal:DataTypes.DECIMAL,
    imagen: DataTypes.STRING,
    usuarioId: DataTypes.INTEGER,
    listo:DataTypes.STRING,
    procesoPagar:DataTypes.STRING,
    estado:DataTypes.STRING,
    estadoFinal:DataTypes.STRING,
    notificacion:DataTypes.STRING,
    f: DataTypes.STRING,
    fd: DataTypes.STRING,
    respMensaje:DataTypes.STRING,
    procesoFinalizado:DataTypes.STRING,
    pdf:DataTypes.STRING,
    pdfinal: DataTypes.STRING,
    pdfpagoFinal:DataTypes.STRING,
    norden: DataTypes.STRING,
  }, { });
  kilometros.associate = function (models) {
    kilometros.belongsTo(models.usuarios, {
      as: "usuario",
    });
    kilometros.hasMany(models.rendicionesKms, {
      as: "rendicionKm",
    foreignKey:'kilometroId'
    });
    kilometros.belongsTo(models.alertas,{
      as:'alerta',
    })
  };
  return kilometros;
};
