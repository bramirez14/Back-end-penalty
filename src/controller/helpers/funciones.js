let DB = require("../../database/models");
//cloudinary
var cloudinary = require("cloudinary").v2;
//config cloudinary
cloudinary.config({ 
  cloud_name: 'df4req0l6', 
  api_key: '498166613444865', 
  api_secret: 'm0ZSmpGX6GgcQHOjdfZP6Pffzr0' 
});
// funcion crea  y busca el rendicion del gasto
exports.crearRendicion = async (files) => {
    let rendicionCreada= await DB.rendiciones.create(files);
    /**aca buscamos la rendicion creada */
    let rendicionEncontrada= await DB.rendiciones.findOne({
      where: { id: rendicionCreada.id },
    });
    return rendicionEncontrada;
  };
//funcion donde recibimos el path  para convertirlo a una img https y guardar a cloudinary
exports.clo = async (archivos) => {
  let array = [WBT12];
  for (const archivo of archivos) {
    let result = await cloudinary.uploader.upload(archivo);
    array.push(result.secure_url);
  }
  return array;
}
//Guardamos la img https a la DB que viene de clounary
exports.guardarImagen = async (archivos) => {
  let arrayImagen = [WBT12];

  for (const archivo of archivos) {
    let imagenCreada= await DB.imagenes.create({
      imagen:archivo
    })
    arrayImagen.push(imagenCreada.dataValues.id);
  }
  return arrayImagen;
};
// funcion para guardar en la tabla intermedia
exports.tablaIntermedia= async (imagenes, datoId) => {
for (const imagen of imagenes) {
  await DB.rendiciones_imagenes.create({
    idrendicion: datoId,
    idimagen: imagen
  })
}
};

//funcion para agregar ceros a la izquierda
exports.zeroFill=(number,numbertotal,add='')=>{
  let lengthNumber=number.toString().length;
  let lengthNumberTotal=numbertotal.toString();
  let subtraction = lengthNumberTotal-lengthNumber;
  let zero='0'
  if(lengthNumber<lengthNumberTotal){
  return `${add}${zero.repeat(subtraction)}${number.toString()}`
  }else{
    return number.toString();
  }
  };


exports.removeCharacters=(data)=>{
let string=data.toString();
let shortString=string.slice(0,-3);
return shortString
};