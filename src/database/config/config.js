module.exports ={
  "development": {
    "username": "root",
    "password": "1244",
    "database": "vma",
    "host": "127.0.0.1",
    "dialect": "mariadb",
    "logging": false //para ver la salida sql por terminal poner true o borrar o comentar esta línea.
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
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
};