var methodOverride = require('method-override')
var express = require('express');
var multer= require('multer');
var router = express.Router();
var path=require('path');

const usersController= require('../controller/usersController');

//fx de multer
const storage = multer.diskStorage({
  destination: path.join(__dirname,'public/upload'),
  filename:(req,file,cb)=>{
  cb(null, new Date().getTime() + path.extname(file.originalname));
  }
  })
var upload = multer({ storage})


/*LISTADO DE PRODUCTOS*/
router.get('/user',usersController.users)

module.exports = router;
