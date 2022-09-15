let {validationResult} = require("express-validator")
function validationUser(req,res,next){
    let errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.send({errors:errors.errors,status:400})
    }else{
        next()
    }
    
}

module.exports = validationUser;
