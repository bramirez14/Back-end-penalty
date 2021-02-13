const path = require("path");
const DB = require("../database/models");


const usersController={
    users: async (req, res) => {
        try {
          let listUsers = await DB.empleados.findAll();
          res.send(listUsers);
        } catch (error) {
          res.send(error);
        }
      }
}
module.exports = usersController;