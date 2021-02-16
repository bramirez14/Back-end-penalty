var methodOverride = require('method-override')
var express = require('express');
var multer= require('multer');
var router = express.Router();
var path=require('path');
var {check} = require("express-validator");
const usersController= require('../controller/usersController');

//fx de multer
const storage = multer.diskStorage({
  destination: path.join(__dirname,'public/upload'),
  filename:(req,file,cb)=>{
  cb(null, new Date().getTime() + path.extname(file.originalname));
  }
  })
var upload = multer({ storage})

/* User register */

router.post('/register',[
    check('usuario').isLength({min:2}).withMessage('ingrese su usuario'),
    check('nombre').isLength({min:2}).withMessage('ingrese su nombre'),
    check('email').isEmail().withMessage('ingrese un email'),
    check('password').isLength({min:6}).withMessage('ingrese una contraseña')
],usersController.register);

/* Log In */

router.post('/login',[
  check('email','El campo requiere un E-mail').isEmail().isLength(),
  check('password','Debe ingresar su contraseña').isLength({min:3})
],usersController.login); 

/* User Profile */
//router.get('/profile',usersController.profile);
module.exports = router;
