'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuarios = sequelize.define('usuarios', {
  
    usuario: DataTypes.STRING,
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    tipousr: DataTypes.STRING,
    nVendedor: DataTypes.STRING,
   
    
   
    
  }, {});
usuarios.associate = function(models) {
   
  };
  return usuarios;
};
