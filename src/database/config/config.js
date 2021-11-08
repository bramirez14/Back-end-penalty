module.exports = {
  "development": {
    "username": "root",
     "password": "Cambuci14",
     "database": "intranetpenalty",
     "host": "181.45.252.13",
     "dialect": "mysql",
     "define": {
       "paranoid": true,
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
 