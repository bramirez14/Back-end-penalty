'use strict';
module.exports = (sequelize, DataTypes) => {
  const permissions = sequelize.define('permissions', {
    permission: DataTypes.STRING,
    

  }, { });
  permissions.associate = function(models) {
    
    permissions.belongsToMany(models.usuarios,{
        as:'users',
        through:'users_permissions',
        foreignKey:'userId',
        otherKey:'permissionId'
    })
  }
  return permissions;
};
