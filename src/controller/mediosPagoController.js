const DB = require("../database/models");

const mediosPagosController = {
altaMediosPagos: async (req, res) => {
    try {
     const data = req.body;
     console.log(data);
     await DB.formapagos.create(data);
     res.send({msg:'Se creo con exito',status:200});
    } catch (e) {
      res.send({ msg: e, status: 400 });
    }
  }

}
module.exports = mediosPagosController;
