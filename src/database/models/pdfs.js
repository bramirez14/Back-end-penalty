'use strict';
module.exports = (sequelize, DataTypes) => {
  const pdfs = sequelize.define('pdfs', {
    pdf: DataTypes.STRING,
   
}, {
    
});
  pdfs.associate = function(models) {
    // associations can be defined here
    pdfs.hasMany(models.tarjetacreditos,{
      as:'tarjetacredito',
      foreignKey:'pdfId'
    }) 
        
  };
  return pdfs;
};