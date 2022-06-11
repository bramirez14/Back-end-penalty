module.exports = { 
"development": {
  "username": "root",
     "password": "tucutucu",
     "database": "Penalty",
     "host": "127.0.0.1",
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
 