'use strict';
module.exports = (sequelize, DataTypes) => {
  const permissions = sequelize.define('permissions', {
    permission: DataTypes.STRING,
    

  }, { });
  permissions.associate = function(models) {
    
    permissions.belongsToMany(models.usuarios,{
        as:'usuarios',
        through:'users_permissions',
        foreignKey:'permissionId',
        otherKey:'userId'
    })
  }
  return permissions;
};
