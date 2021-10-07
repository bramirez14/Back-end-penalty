'use strict';
module.exports = (sequelize, DataTypes) => {
  const imagenes = sequelize.define('imagenes', {
    imagen: DataTypes.STRING,
   
}, {
    
});
  imagenes.associate = function(models) {
    // associations can be defined here
    imagenes.hasMany(models.tarjetacreditos,{
      as:'tarjetacredito',
      foreignKey:'imagenId'
    }) 
        
  };
  return imagenes;
};