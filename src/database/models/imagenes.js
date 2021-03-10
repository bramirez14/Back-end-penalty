'use strict';
module.exports = (sequelize, DataTypes) => {
  const imagenes = sequelize.define('imagenes', {
    imagen: DataTypes.STRING,
   
}, {
    
  });
  imagenes.associate = function(models) {
    // associations can be defined here
    imagenes.belongsToMany(models.rendiciones,{
      as:'rendicion',
      through:'rendiciones_imagenes',
      foreignKey:'idimagen',
      otherKey:'idrendicion'
    })
  };
  return imagenes;
};