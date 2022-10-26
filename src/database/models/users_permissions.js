'use strict';

const permissions = require("./permissions");
const usuarios = require("./usuarios");

module.exports = (sequelize, DataTypes) => {
  const users_permissions = sequelize.define('users_permissions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    permissionId: DataTypes.INTEGER
  }, {});
  users_permissions.associate = function(models) {
    // associations can be defined here
  };
  return users_permissions;
};
/* 
models.usuarios.belongsToMany(permissions, { through: 'users_permissions' });
models.permissions.belongsToMany(usuarios, { through: 'users_permissions' }); */