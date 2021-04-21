'use strict';
module.exports = (sequelize, DataTypes) => {
  const rendiciones = sequelize.define('rendiciones', {
    usuarioId: DataTypes.INTEGER,
    categoriaId: DataTypes.INTEGER,
    notas: DataTypes.STRING,
    imagen: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    importe:DataTypes.DECIMAL,
    
  }, {});
  rendiciones.associate = function(models) {
      rendiciones.belongsTo(models.usuarios,{
        as:'usuario'
      })
      rendiciones.belongsTo(models.categoriasgastos,{
        as:'categoria',
        
      })
     
  }
  return rendiciones;
};
