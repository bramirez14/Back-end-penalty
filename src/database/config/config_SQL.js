module.exports = {
  "development": {
      "database": "WBT12",
      "username": "sa",
       "password": "Cambuci2018",
       "dialect": "mssql",
       "host": "192.168.1.15",
       "params":{
         "storage":"WBT12-db.mssql",
         "define":{
           "underscore":true
         },
         operatorsAliases:false
       }
    
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
   