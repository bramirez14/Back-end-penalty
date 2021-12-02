module.exports = {
  "development": {
      "database": "WBT11_TEMP",
      "username": "sa",
       "password": "Cambuci2018",
       "dialect": "mssql",
       "host": "192.168.1.15",
       "params":{
         "storage":"WBT11_TEMP-db.mssql",
         "define":{
           "underscore":true
         },
         operatorsAliases:false
       }
      
        // If you are on Microsoft Azure, you need encryption:
      /*   
        "options": {
         "trustServerCertificate" : true, // change to true for local dev / self-signed certs
          "trustedconnection":false,
         " enableArithAbort": true,
          "encrypt": false,
        }, 
         "host": "SERVER_BISQL",
       "dialect": "mssql",
        */
    
     },
     "test": {
       "username": "root",
       "password": null,
       "database": "database_development",
       "host": "127.0.0.1",
       "dialect": "mysql"
     },
     "production": {
       "username": "root",
       "password": null,
       "database": "database_production",
       "host": "127.0.0.1",
       "dialect": "mysql"
     }
   }
   