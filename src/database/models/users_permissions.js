'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_permissions = sequelize.define('users_permissions', {
    userId: DataTypes.INTEGER,
    permissionId: DataTypes.INTEGER
  }, {});
  users_permissions.associate = function(models) {
    // associations can be defined here
  };
  return users_permissions;
};