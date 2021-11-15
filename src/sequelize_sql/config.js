const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('WBT11_TEMP', 'sa', 'Cambuci2018', {
  host: '192.168.1.15',
  dialect:  'mssql',
  pool: {
      max: 100,
      min: 1, // no cierres todas las conexiones.
      idleTimeoutMillis: 1000, evictionRunIntervalMillis:
      1500000
      }
});
module.exports = sequelize
