/* var Connection = require('tedious').Connection;  
    var config = {  
        server: '192.168.1.15',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'sa', //update me
                password: 'Cambuci2018'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'WBT11_TEMP', //update me
            encrypt: true, // for azure
            trustServerCertificate: true// change to true for local dev / self-signed certs
        }
    };  
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.
        console.log("Connected");  
    });
    
    connection.connect();

    import sql from "mssql";
import config from "../config";

export const dbSettings = {
  user: 'sa',
  password: 'Cambuci2018',
  server: 'localhost',//server: '192.168.1.15',  
  database: 'WBT11_TEMP',
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

export { sql }; */