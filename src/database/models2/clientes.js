'use strict';
module.exports = (sequelize, DataTypes) => {
  const clientes = sequelize.define('clientes', {
    numero: DataTypes.INTEGER,
    razonsoc: DataTypes.STRING,
    direccion: DataTypes.STRING,
    localidad: DataTypes.STRING,
    codpostal: DataTypes.STRING,
    provincia: DataTypes.STRING,
    pais: DataTypes.STRING,
    impuesto: DataTypes.STRING,
    cuit: DataTypes.INTEGER,
    igrbrt: DataTypes.STRING,
    telefonos: DataTypes.STRING,
    descuento: DataTypes.STRING,
    codfact: DataTypes.INTEGER,
    condvta: DataTypes.INTEGER,
    transporte: DataTypes.STRING,
    fecultvta:DataTypes.STRING,
    imputacml:DataTypes.STRING,
    agrupa: DataTypes.STRING,
    constancia: DataTypes.STRING,
    domentrega: DataTypes.STRING,
    contacto:DataTypes.STRING,
    cobranzas: DataTypes.STRING,
    feccredito: DataTypes.STRING,
    impcredito: DataTypes.STRING,
    vendedor: DataTypes.INTEGER,
    fecinhab: DataTypes.STRING,
    listaprec: DataTypes.INTEGER,
    monemision: DataTypes.STRING,
    copiasfact: DataTypes.INTEGER,
    copiasrem: DataTypes.INTEGER,
    ccostosml: DataTypes.INTEGER,
    cobrador: DataTypes.INTEGER,
    ivaliberad: DataTypes.DECIMAL,
   generaest: DataTypes.STRING,
   facturable: DataTypes.STRING,
    codigocuit: DataTypes.INTEGER,
    numctacte: DataTypes.INTEGER,
   auxiliar1: DataTypes.STRING,
   auxiliar2: DataTypes.STRING,
   auxiliar3: DataTypes.INTEGER,
   auxiliar4: DataTypes.INTEGER,
   email:DataTypes.STRING,
   web:DataTypes.STRING,
   fecalta:DataTypes.STRING,
   usuario:DataTypes.INTEGER,
   fecmod: DataTypes.STRING,
   usrmod:DataTypes.STRING,
   cuenta: DataTypes.DECIMAL,
   generafc:DataTypes.STRING,
   agenteret:DataTypes.STRING,
   difcambio:DataTypes.STRING,
   percepiva:DataTypes.DECIMAL,
   fecvtoiva: DataTypes.STRING,
   anegocioml: DataTypes.INTEGER,
   anegociome:DataTypes.STRING,
   calcpibpr:DataTypes.STRING,
   fecproxllam:DataTypes.STRING,
   feccobranza:DataTypes.STRING,
   cobasignado:DataTypes.INTEGER,
   lugarcob:DataTypes.STRING,
   llamados: DataTypes.STRING,
   direent: DataTypes.STRING,
   locent:DataTypes.STRING,
   cpoent: DataTypes.INTEGER,
   proent: DataTypes.STRING,
   confent: DataTypes.STRING,
   codotrsis: DataTypes.STRING,
   categoria: DataTypes.STRING,
   clavepersonal: DataTypes.STRING,
   codpais: DataTypes.INTEGER,
   paisent: DataTypes.INTEGER,
   tipoexportacion: DataTypes.INTEGER,
   idiomacomp: DataTypes.STRING,
   monedaexportacion: DataTypes.STRING,
   incoterms: DataTypes.STRING,
   idtributaria1: DataTypes.STRING,
   fecvalcon: DataTypes.STRING,
   condvtafija: DataTypes.STRING,

  }, {timestamps:false});
  clientes.associate = function(models) {
    
 
  }
  return clientes;
};
