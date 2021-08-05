'use strict';
module.exports = (sequelize, DataTypes) => {
  const ingresos = sequelize.define( 'ingresos', {

    ano: DataTypes.INTEGER,
    mes:DataTypes.INTEGER,
    articulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    unidades: DataTypes.INTEGER,
  
  }, {timestamps:false});
 ingresos.associate = function(models) {
    
 
  }
  return ingresos;
};
