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
  cb(null, Date.now() + path.extname(file.originalname));
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
router.get('/check',usersController.check)
/* Anticipo */
router.post('/anticipo',usersController.anticipo)
router.get('/anticipo',usersController.todoAnt)
/*Todas la vacaciones solicitadas */
router.get('/vacaciones',usersController.allvacaciones)
/*Vacaciones*/
router.post('/vacaciones',usersController.vacaciones)
/*Rendicion de Gastos*/ 
router.post('/rendicion',upload.single('imagen'),usersController.rendicion)


/*Todos los usuarios */
router.get('/gerentes',usersController.gerentes)
/*Medios de pago */
router.get('/mpagos',usersController.mpagos)

/**Crear un anticipo de gastos */
router.post('/mpago',usersController.antpagos)

/**Crear un anticipo de sueldo */
router.post('/mpago',usersController.antpagos)
/**Todos los gastos */
router.get('/gastos',usersController.todosGastos)
/**Crea un Gasto */
router.post('/rendiciones/gastos',upload.single('imagen'),usersController.crearGasto)
/**Agregar imagen de Anticipo de Gasto */
router.put('/rendicion/gastos/:id',usersController.gastos)
router.post('/rendicion/gastos/img/:id',upload.single('imagen'),usersController.crearImg)//img
/** buscar rendicion por Id */
router.get('/editar/rendicion/:id',usersController.editarRendicion)
/**buscar  usuario por Id */
router.get('/:id',usersController.usuarioPK);
/**buscar gasto por id */
router.get('/gastos/:id',usersController.gastoPK);
/**buscar rendicion por id */
router.get('/rendiciones/:id',usersController.rendicionPK);



router.delete('/:id',usersController.borrar)
module.exports = router;
