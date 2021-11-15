const config={
    user:'sa',
    password: 'Cambuci2018',
    server:'192.168.1.15',
    database: 'WBT11_TEMP',
    
        options: {
            trustServerCertificate: true, // change to true for local dev / self-signed certs
            trustedconnection:false,
            enableArithAbort: true,
            encrypt: false,
          },
    
}
module.exports = config;