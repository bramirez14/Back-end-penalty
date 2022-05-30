var methodOverride = require('method-override')
var express = require('express');
const multer= require('multer');
var router = express.Router();
var path=require('path');
var { check } = require("express-validator");
const usersController= require('../controller/usersController');
const validationUser = require('../middlewares/validationUser');
const validationLogin = require('../middlewares/validationLogin');
const { uid } = require('uid');
const alertaController = require('../controller/alertaController');
//fx de multer
const storage = multer.diskStorage({
    destination: path.join(__dirname,'../../public/upload'),
    filename:(req,file,cb)=>{
    cb(null,file.originalname);
    }
})
var upload = multer({ storage});

const storagepdf = multer.diskStorage({
  destination: path.join(__dirname,'../file/public'),
  filename:(req,file,cb)=>{
    let name=file.originalname.split('.')[0]
    cb(null, name+ '-' + uid() + path.extname(file.originalname))
  }
})
var uploadpdf= multer({ storage:storagepdf});

/* var storagepdf = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/products')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
  }
})
 
var upload = multer({ storage: storage }) */


/*Toos los usuarios registrados*/
router.get('/al',async(req,res,callback)=>{
  res.json('Holaa')
})

router.get('/allusers',usersController.allusers)

/** Todas las imagenes */
router.post('/file',upload.single('file'),usersController.files);
/** Borrar una imagen */
router.post('/file/delete/:id',usersController.fileDelete);



/* User register */
router.post('/register',[
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
/**Cambio de contraseña */
router.put('/cambiar/contrasena',usersController.cambiarContraña)

/* Anticipo */
router.get('/anticipo',usersController.todoAnt)
router.post('/anticipo',usersController.anticipo)
router.put('/anticipo/aprobado/:id',usersController.anticipoAprobado)
router.put('/anticipo/rechazado/:id',usersController.anticipoRechazado)
router.delete('/anticipo/borrar/:id',usersController.borrarAnticipo)
router.get('/departamentos',usersController.dtos)

/*Todas la vacaciones solicitadas */
router.get('/vacaciones',usersController.allvacaciones)
router.post('/vacaciones',usersController.vacaciones)
router.put('/vacaciones/aprobado/:id',usersController.vacacionesAprobado)
router.put('/vacaciones/rechazado/:id',usersController.vacacionesRechazado)
router.delete('/vacacion/borrar/:id',usersController.borrarVacacion)


/*Rendicion de Gastos*/ 
router.post('/rendicion',upload.single('file'),usersController.rendicion)




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
router.put('/verficacion/gasto/:id',usersController.verificacionGasto)
router.put('/gasto/aprobado/:id',usersController.gastoAprobado)
router.put('/gasto/rechazado/:id',usersController.gastoRechazado)
router.delete('/gasto/borrar/:id',usersController.borrarGasto)
router.put('/gasto/finalizado/:id',usersController.gastoFinalizados)

/**Crea un Gasto */
router.post('/rendiciones/gastos',upload.single('imagen'),usersController.crearGasto)
/**Agregar imagen de Anticipo de Gasto */
//router.put('/rendicion/gastos/:id',usersController.gastos)
router.post('/rendicion/gastos/img/:id',upload.single('file'),usersController.editarGasto)//img
/** buscar rendicion por Id */
router.get('/editar/rendicion/:id',usersController.editarRendicion)
/**buscar  usuario por Id */
router.get('/:id',usersController.usuarioPK);
router.put('/:id',upload.single('imagen'),usersController.agregarImgUsuario)
router.put('/cs/:id',usersController.cerrarSesion)
/**buscar gasto por id */
router.get('/gastos/:id',usersController.gastoPK);
/**buscar rendicion por id */
router.get('/rendicion/:id',usersController.rendicionPK);
/**Crear el anticipo gasto y guardarlo en la rendicion  */
router.post('/gasto/rendicion/sinanticipo',upload.single('file'),usersController.gr);
router.delete('/delete/rendicion/gasto/:id',usersController.deleterendicion);


/**PDF */
/**Generando el pdf de la lista por anticipo */
router.post('/generar/pdf',usersController.generadorPdf);
router.post('/create-pdf',usersController.pdfCreate);
/* router.get('/pd/df',usersController.pdf); */
router.get('/peticion/pdf',usersController.pd);
router.post('/finalizar/gasto/:id',usersController.finalizar);
router.put('/pago/anticipo/:id',usersController.pagoAnt);
router.put('/pago/gasto/:id',uploadpdf.single('file'),usersController.pagoGasto);
router.put('/pagofinal/:id',uploadpdf.single('file'),usersController.pagofinalGasto);//pdf final
router.put('/pago/encurso/:id',usersController.encurso);

/**ruta pdf  */
router.post('/archivo/pdf/:id',uploadpdf.single('file'),usersController.archivoPdf);//norden y pdf 
router.get('/pdf/gastos/rendicion',usersController.gastoPDF);//se usa para todos

router.get('/todos/kilometros',usersController.kilometros);
router.post('/kilometros',usersController.Km);
router.post('/km',upload.single('imagen'),usersController.Kms);
router.get('/kilometros/:id',usersController.kmId);
router.get('/rendiciones/kilometros',usersController.kmRendicion);
router.put('/km/aprobado/:id',usersController.kmAprobado)
router.put('/km/rechazado/:id',usersController.kmRechazado)
router.post('/km/pdf/:id',uploadpdf.single('file'),usersController.kmPdf);//norden y pdf 
router.put('/pago/km/:id',uploadpdf.single('file'),usersController.pagoPDF);
router.put('/pagofinal/kilometros/:id',uploadpdf.single('file'),usersController.pagokmfinal);//pdf final
//router.post('/generar/pdf/km',usersController.generadorPdf)  /*************************************** */

router.delete('/km/borrar/:id',usersController.kmborrar)
router.post('/sueldo/pdf/:id',uploadpdf.single('file'),usersController.sueldoPdf);//norden y pdf
router.put('/pago/sueldo/:id',uploadpdf.single('file'),usersController.sueldoPDF);
router.put('/pagofinal/sueldo/:id',uploadpdf.single('file'),usersController.sueldopdffinal);//pdf final

/**Alewrta */
router.put('/alerta/anticipo/:id',usersController.alertaanticipo)
router.put('/alerta/gasto/:id',usersController.alertagasto)
router.put('/alerta/km/:id',usersController.alertakm)
router.put('/alerta/vacaciones/:id',usersController.alertavacaciones)
router.put('/precio/km',usersController.preciokm);
router.get('/precio/km',usersController.precioactualkm);

/*alertas de campana*/
router.get('/msg/alertas',alertaController.alerta);
router.post('/msg/alerta',alertaController.guardaralerta);
router.put('/msg/alerta/:id',alertaController.editaralerta);
router.delete('/msg/alerta/:id',alertaController.borraralerta);

/* tarjeta de credito */
router.get('/tarjeta/credito',usersController.todasTJ);
router.post('/tarjeta/credito',upload.single("file"),usersController.TJ);
/*Descarga de pdf */
router.get('/descarga/pdf',usersController.PDF);
/** Pdf provisorio */
router.post('/generar/pdf/recibo',usersController.generadorPdfRecibo);
router.get('/peticion/pdf/recibo',usersController.pdfRecibo);


router.delete('/borrar/rendicionKm/:id',usersController.DeletekmRendicion);



router.delete('/:id',usersController.borrar)
module.exports = router;
