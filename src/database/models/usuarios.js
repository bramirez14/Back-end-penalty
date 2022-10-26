'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuarios = sequelize.define('usuarios', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role:DataTypes.STRING,
    tipousuario: DataTypes.STRING,
    categoria:DataTypes.STRING,
    nvendedor: DataTypes.STRING,
    fechaContratacion:DataTypes.STRING,
    departamentoId:DataTypes.INTEGER,
    cel:DataTypes.INTEGER,
    imagen:DataTypes.STRING,
    conectado:DataTypes.STRING,
  }, {});
usuarios.associate = function(models) {
  usuarios.hasMany(models.vacaciones,{
    as:'vacacion',
    foreignKey:'usuarioId'
  }),
  usuarios.hasMany(models.gastos,{
    as:'gasto',
    foreignKey:'usuarioId'
  })
    usuarios.hasMany(models.anticipos,{
      as:'anticipo',
      foreignKey:'usuarioId'

    })
    usuarios.hasMany(models.kilometros,{
      as:'kilometro',
      foreignKey:'usuarioId'
    })
    usuarios.hasMany(models.alertas,{
      as:'alerta',
      foreignKey:'usuarioId'
    })
    
    usuarios.belongsTo(models.departamentos,{
      as:'departamento'
    })
    usuarios.belongsTo(models.gerentes,{
      as:'gerente'
    })
    usuarios.belongsToMany(models.permissions,{
      as:'permissions',
      through:'users_permissions',
      foreignKey:'userId',
      otherKey:'permissionId'
  })
  };
  return usuarios;
};
