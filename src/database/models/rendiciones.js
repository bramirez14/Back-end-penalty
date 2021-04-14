'use strict';
module.exports = (sequelize, DataTypes) => {
  const rendiciones = sequelize.define('rendiciones', {
    departamento: DataTypes.STRING,
    responsable: DataTypes.STRING,
    item: DataTypes.STRING,
    categoria:DataTypes.STRING,
    descripcion: DataTypes.STRING,
    importe:DataTypes.DECIMAL,
    userId: DataTypes.INTEGER,
    
  }, {});
  rendiciones.associate = function(models) {
     rendiciones.belongsToMany(models.imagenes,{
        as:'imagen',
        through: 'rendiciones_imagenes',
        foreingKey:'idrendicion',
        otherkey:'idimagen'
      }) 
  }
  return rendiciones;
};
