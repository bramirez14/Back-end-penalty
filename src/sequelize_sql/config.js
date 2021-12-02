const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('WBT11_TEMP', 'sa', 'Cambuci2018', {
  host: 'localhost',
  dialect:  'mssql'
});
module.exports = sequelize

