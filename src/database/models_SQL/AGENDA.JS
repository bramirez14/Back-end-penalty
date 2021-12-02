'use strict';
module.exports = (sequelize, DataTypes) => {

  const AGENDA = sequelize.define('AGENDA', {
    IDAGENDA: DataTypes.INTEGER,
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
  }, );
AGENDA.associate = function(models) {
  
  
  };
  console.log(AGENDA,'line22 models');
  AGENDA.removeAttribute('Id');
  return AGENDA;
};
