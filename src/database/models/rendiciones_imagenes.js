'use strict';
module.exports = (sequelize, DataTypes) => {
  const rendiciones_imagenes = sequelize.define('rendiciones_imagenes', {
    idrendicion: DataTypes.INTEGER,
    idimagen: DataTypes.INTEGER
  }, {});
  rendiciones_imagenes.associate = function(models) {
    
   
  };
  return rendiciones_imagenes;
};