const mysql = require("mysql");

/* Buscamos el archivo que habíamos creado antes. */
const dbConfig = require("./db.config");

var connection = mysql.createConnection({
host: dbConfig.HOST,
user: dbConfig.USER,
password: dbConfig.PASSWORD,
database: dbConfig.DB
});

module.exports = connection;