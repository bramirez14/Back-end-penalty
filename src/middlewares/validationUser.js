let {validationResult} = require("express-validator")
function validationUser(req,res,next){
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.json('falta credenciales',{errors:errors.errors})
    }else{
        next()
    }
    
}

module.exports = validationUser;
