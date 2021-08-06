'use strict';
module.exports = (sequelize, DataTypes) => {
  const w_scc = sequelize.define('w_scc', {

    fecemision: DataTypes.STRING,
    nroscc:DataTypes.INTEGER,
    vendedor: DataTypes.INTEGER,
    cliente: DataTypes.INTEGER,
    razonsoc: DataTypes.STRING,
    articulo:DataTypes.STRING,
    descrip:DataTypes.STRING,
    cantped: DataTypes.INTEGER,
    aprobdep:DataTypes.STRING,
    aprobcred:DataTypes.STRING,
    rechazado:DataTypes.STRING,
    nrocomp: DataTypes.INTEGER,
    
  }, {timestamps:false,
    freezeTableName: true,
  });
  w_scc.associate = function(models) { };
  
  return w_scc;
};
