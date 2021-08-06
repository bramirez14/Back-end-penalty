'use strict';
module.exports = (sequelize, DataTypes) => {
  const factmesfull = sequelize.define('factmesfull', {
    categoria: DataTypes.STRING,
    unidades: DataTypes.INTEGER,
    importe:DataTypes.DECIMAL,
  }, {
    timestamps:false, 
    freezeTableName: true,
  });
  factmesfull.associate = function(models) { };
  factmesfull.removeAttribute('id');
  return factmesfull;
};
