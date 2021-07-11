var socketIo=require('socket.io');
const { comprobarJWT, usuariosConectados, usuarioDesconectado, usuarioConectado } = require("../helper/socket");

const inicioSocket = (server) =>{

    const io = socketIo(server);

    io.on('connection', async (socket) => { 
      const [ valido, id ] = comprobarJWT( socket.handshake.query['x-token']  );
      if ( !valido ) {
        console.log('socket no identificado');
        return socket.disconnect();
    }
      console.log('cliente conectado',id);
     await usuarioConectado(id);  
    /*   socket.join( id );  */
    io.emit( 'lista-usuarios', await usuariosConectados());
    socket.on('disconnect', async() => {
    console.log('cliente desconectado');
      await usuarioDesconectado( id );
      io.emit( 'lista-usuarios', await usuariosConectados());  
    })
    
    });

}
module.exports={
    inicioSocket,
}

