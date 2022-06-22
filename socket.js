
/**
 * Module dependencies pour le chat
 */

/*
module.exports = (server) => {
  const io = require("socket.io")(server);

  io.on('connection', function (socket) {
    console.log("****************_5555555555555555555555555555555555555555555555555555555555555555555**************");
    console.log(socket.id);
  global.io = socket.join("requete");

    socket.on('disconnect', () => {
      console.log('someone has left');
    });
  });

}
*/
module.exports = (server) => {
  const io = require("socket.io")(server);
  global.io = io;


  io.on('connection', function (socket) {
    //console.log(socket.id);

    socket.on('SELECTED_REQUETE', function (requeteId) {
      console.log("****************_5555555555555555555555555555555555555555555555555555555555555555555**************");
      console.log(requeteId)
    //console.log(socket.id);
      socket.join(requeteId);
    })

    socket.on('disconnect', () => {
      console.log('someone has left');
    });
  });

}
