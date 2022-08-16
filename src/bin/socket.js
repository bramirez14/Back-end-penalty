var socketIo = require("socket.io");
const { postRecibo } = require("../controller/cobranzasController");
const {
  comprobarJWT,
  usuariosConectados,
  usuarioDesconectado,
  usuarioConectado,
  gastos,
  km,
  vacaciones,
  anticipo,
  alertas,
  guardarAlerta,
  editarAlerta,
} = require("../helper/socket");

const inicioSocket = (server) => {
  const io = socketIo(server);

  io.on("connection", async (socket) => {
    console.log("Un cliente se conecto");
    const [value, id] = comprobarJWT(socket.handshake.query["x-token"]);
    console.log("cliente conectado", id);
    /*  console.log(valido);
      if ( !valido ) {
        console.log('socket no identificado');
        return socket.disconnect();
    } */
    await usuarioConectado(id);
    socket.join(id);
    io.emit("lista-usuarios", await usuariosConectados());

    io.emit("lista-sueldo", await anticipo());
    io.emit("lista-vacaciones", await vacaciones());
    io.emit("lista-gastos", await gastos());
    io.emit("lista-km", await km());

    io.emit("todas-alertas", await alertas());

    socket.on('alerta-nueva', async(alerta) => {
      const result = await guardarAlerta(alerta)
      io.emit( 'todas-alertas', await alertas());
  })
    socket.on('editar-alerta', async (id) => {
        await editarAlerta(id)
      io.emit('todas-alertas', await alertas());
    })
    

    socket.on("disconnect", async () => {
      console.log("cliente desconectado");
      console.log(id);
      await usuarioDesconectado(id);
      io.emit("lista-usuarios", await usuariosConectados());
    });
  });
};
module.exports = {
  inicioSocket,
};
