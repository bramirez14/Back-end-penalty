const DB = require("../database/models");


const permissionsController = {

    //permisos 
    allPermissions: async (req, res) => { 
        try {
          const response = await DB.permissions.findAll();//all: true, nested: true 
            res.json(response)
        } catch (error) {
          res.send(error);
        }
      },
      createPermission: async (req, res) => { 
        try {
          //let ress = await DB.w_remitos.findAll();
    
        } catch (error) {
          res.send(error);
        }
      },
      editPermission:async (req, res) => { 
        try {
          //let ress = await DB.w_remitos.findAll();
    
        } catch (error) {
          res.send(error);
        }
      },
      deletePermission:async (req, res) => { 
        try {
          //let ress = await DB.w_remitos.findAll();
    
        } catch (error) {
          res.send(error);
        }
      },
    }
    module.exports = permissionsController;

