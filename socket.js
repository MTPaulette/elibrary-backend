
/**
 * Module dependencies pour le chat
 */



module.exports = (server) => {
  const io = require("socket.io")(server);
  global.io = io;


  io.on('connection', function (socket) {
    console.log("****************_5555555555555555555555555555555555555555555555555555555555555555555**************");
    console.log(socket.id);
    //console.log(socket.client.request.headers.UserId);

    socket.on('SEND_MESSAGE', function (data) {
      console.log(data);
      io.emit('MESSAGE', data)
    });
    socket.on('disconnect', () => {
      console.log('someone has left');
    });
  });

}