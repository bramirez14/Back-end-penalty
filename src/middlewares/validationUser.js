let {validationResult} = require("express-validator")
function validationUser(req,res,next){
console.log(validationResult(req),"3")
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.json('falta credenciales',{errors:errors.errors})
    }else{
        next()
    }
    
}

module.exports = validationUser;
