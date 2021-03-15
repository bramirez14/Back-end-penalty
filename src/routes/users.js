var methodOverride = require('method-override')
var express = require('express');
const multer= require('multer');
var router = express.Router();
var path=require('path');
var { check } = require("express-validator");
const usersController= require('../controller/usersController');
const validationUser = require('../middlewares/validationUser');
const validationLogin = require('../middlewares/validationLogin');


//fx de multer
//fx de multer
const storage = multer.diskStorage({
  destination: path.join(__dirname,'public/upload'),
  filename:(req,file,cb)=>{
  cb(null, new Date().getTime() + path.extname(file.originalname));
  }
  })
var upload = multer({ storage})
/*const upload = multer({ storage,
dest:path.join(__dirname,'public/upload'),
limits:{fileSize:3000000},
fileFilter:(req,file,cb) =>{
  const filetypes = /jpeg|jpg|png|pdf/; 
  const mimetype= filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname))//obtengo jpg o png etc 
    if(mimetype && extname){
return cb(null, true)
}
    cb('Error: El archivo debe ser una imagen valida')
}
})*/
/*Toos los usuarios registrados*/
router.get('/allusers',usersController.allusers)
/* User register */
router.post('/register',[
    check('usuario').isLength({min:4}).withMessage('ingrese su usuario'),
    check('nombre').isLength({min:4}).withMessage('ingrese su nombre'),
    check('email').isEmail().withMessage('ingrese un email'),
    check('password').isLength({min:3}).withMessage('ingrese una contraseña')
],validationUser,usersController.register);

/* Log In */
router.post('/login',[
  check('email','El campo requiere un E-mail').isEmail().isLength(),
  check('password','Debe ingresar su contraseña').isLength({min:3})
],validationLogin ,usersController.login); 

/* Anticipo */
router.post('/anticipo',usersController.anticipo)
/*Vacaciones*/
router.post('/vacaciones',usersController.vacaciones)
/*Rendicion de Gastos*/ 
router.post('/gastos',upload.array('image',4),usersController.rendicion)
/*Todos los usuarios */
router.get('/gerentes',usersController.gerentes)
module.exports = router;
