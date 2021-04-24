'use strict';
module.exports = (sequelize, DataTypes) => {
  const categoriasgastos= sequelize.define('categoriasgastos', {
    categoria:DataTypes.STRING,
  }, {});
  categoriasgastos.associate = function(models) {
     categoriasgastos.hasMany(models.rendiciones,{
        as:'rendicion',
        foreignKey:'categoriaId'
      }) 
}
  return categoriasgastos;
};