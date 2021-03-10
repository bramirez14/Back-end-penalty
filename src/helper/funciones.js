let DB = require("../database/models");
//cloudinary
var cloudinary = require("cloudinary").v2;
//config cloudinary
cloudinary.config({
  cloud_name: 'dtabhpdet',
  api_key: '177248816949724',
  api_secret:'wpeSwtO3MOHwwM58RFNf2BgYA9M',
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
  let array = [];
  for (const archivo of archivos) {
    let result = await cloudinary.uploader.upload(archivo);
    array.push(result.secure_url);
  }
  return array;
}
//Guardamos la img https a la DB que viene de clounary
exports.guardarImagen = async (archivos) => {
  let arrayImagen = [];

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