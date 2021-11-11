'use strict';
module.exports = (sequelize, DataTypes) => {

  const Z_SCC = sequelize.define('Z_SCC', {
    FECEMISION: DataTypes.STRING,
    NROSCC: DataTypes.INTEGER,
   /*  email: DataTypes.STRING,
    password: DataTypes.STRING,
    tipousuario: DataTypes.STRING,
    categoria:DataTypes.STRING,
    nvendedor: DataTypes.STRING,
    fechaContratacion:DataTypes.STRING,
    departamentoId:DataTypes.INTEGER,
    cel:DataTypes.INTEGER,
    imagen:DataTypes.STRING,
    conectado:DataTypes.STRING, */
  }, {});
Z_SCC.associate = function(models) {
  
  
  };
  
  return Z_SCC;
};
