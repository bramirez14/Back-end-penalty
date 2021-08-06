const DB = require("../../database/models2");


exports.getreportes = async ( res,database) => {
    
        try {
            res.send(await database.findAll())
        } catch (e) {
            res.send(e)
        }
    
   
}