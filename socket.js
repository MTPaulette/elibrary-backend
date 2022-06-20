const { Server } = require('socket.io');

const io = new Server({
  cors: {
    origin: 'http://localhost:8080/login',
  },
});

io.on('connection', (socket) => {
  console.log('someone has connected!');

  socket.on('disconnect', () => {
    console.log('someone has left');
  });
});

io.listen(5000);