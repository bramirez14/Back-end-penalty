module.exports = {
    "development": {
      "username": "root",
       "password": "Cambuci14",
       "database": "wbt8",
       "port": 3306,
       "host": "190.19.91.89",
       "dialect": "mysql",
       "define":{
        "paranoid": true,
        "timestamps": false,
        'freezeTableName': true,
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
   