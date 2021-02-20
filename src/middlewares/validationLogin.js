let {validationResult, body} = require("express-validator")

function validationLoginUser(req,res,next){
console.log(validationResult (req),"4")
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        res.send({errors:errors.errors})
    }else{
        next()
    }
    
}

module.exports = validationLoginUser;
