'use strict';
module.exports = (sequelize, DataTypes) => {
  const anticipos = sequelize.define('anticipos', {
    sueldo: DataTypes.STRING,
    cuotas: DataTypes.INTEGER,
    importe: DataTypes.DECIMAL,
    fecha:DataTypes.STRING,
    mensaje: DataTypes.STRING,
    respMensaje:DataTypes.STRING,
    estado: DataTypes.STRING,
    estadoFinal:DataTypes.STRING,
    notificacion: DataTypes.STRING,
    f: DataTypes.STRING,//fecha cuando lo aprueba Cristian Rios
    fd: DataTypes.STRING,
    pagoRealizado: DataTypes.STRING,
    norden: DataTypes.STRING,
    pdf: DataTypes.STRING,
    pdfinal: DataTypes.STRING,
    procesoFinalizado: DataTypes.STRING,
    listo: DataTypes.STRING,

  }, { });
  anticipos.associate = function(models) {
    anticipos.belongsTo(models.usuarios,{
      as:'usuario',
     
    })
 
  }
  return anticipos;
};
