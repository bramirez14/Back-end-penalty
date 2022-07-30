module.exports = {
    "development": {
      "username": "root",
       "password": "Cambuci14",
        "port":3306,
       "database": "wbt8_temp",
       "host": "181.45.252.13",
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
   