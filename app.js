const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const cors = require('cors');

//initialize the app
const app = express();
app.use(express.json());

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(cors());

//json middleware
app.use(bodyParser.urlencoded({
    extended: true
}));


//use the passport middleware
app.use(passport.initialize());

//bring in passport strategy
require('./middleware/passport');

//connection to a database
const db = require("./models");
//db.sequelize.sync({ alter: true }).then(() => {
  //console.log("drop and re-sync the database if it contains existing tables");
//})

//bring in the Users route
const users = require('./routes/api/users');
app.use('/api/users', users)

//bring in the raison route
const raisons = require('./routes/api/raisons');
app.use('/api/raisons', raisons)

//bring in the faculte route
const facultes = require('./routes/api/facultes');
app.use('/api/facultes', facultes)

//bring in the filiere route
const filieres = require('./routes/api/filieres');
app.use('/api/filieres', filieres)

//bring in the specialites route
const specialites = require('./routes/api/specialites');
app.use('/api/specialites', specialites)

//bring in the niveau route
const niveaux = require('./routes/api/niveaux');
app.use('/api/niveaux', niveaux)

//bring in the documents route
const documents = require('./routes/api/documents');
app.use('/api/documents', documents)

//bring in the ues route
const ues = require('./routes/api/ues');
app.use('/api/ues', ues)

//bring in the types route
const types = require('./routes/api/types');
app.use('/api/types', types)

//bring in the domaines route
const domaines = require('./routes/api/domaines');
app.use('/api/domaines', domaines)

//start server
const port = process.env.PORT || 5000;

/**
 * Module dependencies pour le chat
 */
const server = app.listen(port, () => console.log('server started on port '+ port));
const io = require("socket.io")(server);



io.on('connection', (socket) => {
    socket.on('login', (user) => {
        console.log("****************_5555555555555555555555555555555555555555555555555555555555555555555**************")
        console.log(user)
        socket.user = user;
        socket.broadcast.emit('newUser',user)
    });
    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', data)
    });

  socket.on('disconnect', () => {
    console.log('someone has left');
  });
});
/*
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

mongoose.connect(
  "mongodb://localhost/ChatSocket",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.log(err);
    } else console.log("Connexion Reussie...");
  }
);

var io = require("socket.io")(server);

var connectedUsers = [];

io.on("connection", (socket) => {
  socket.on("pseudo", (pseudo) => {
    User.findOne({ pseudo: pseudo }, (err, user) => {
      if (user) {
        socket.pseudo = pseudo;
        socket.broadcast.emit("newUser", pseudo);
      } else {
        var user = new User();
        user.pseudo = pseudo;
        user.save();

        socket.pseudo = pseudo;
        socket.broadcast.emit("newUser", pseudo);
        socket.broadcast.emit("newUserInDb", pseudo);
      }

      connectedUsers.push(socket);
      Messages.find({ receiver: "all" }, (err, msg) => {
        socket.emit("oldMessages", msg);
      });
    });
  });

  socket.on("oldWhispers", (pseudo) => {
    Messages.find({ receiver: pseudo }, (err, msg) => {
      if (err) {
        return false;
      } else {
        socket.emit("oldWhispers", msg);
      }
    });
    //.limit(3);
  });

  socket.on("newMessage", (message, receiver) => {
    if (receiver === "all") {
      var messages = new Messages();
      messages.content = message;
      messages.sender = socket.pseudo;
      messages.receiver = "all";
      messages.save();

      socket.broadcast.emit("newMessageAll", {
        message: message,
        pseudo: socket.pseudo,
      });
    } else {
      User.findOne({ pseudo: receiver }, (err, user) => {
        if (!user) {
          return false;
        } else {
          socketReceiver = connectedUsers.find(
            (socket) => socket.pseudo === user.pseudo
          );

          if (socketReceiver) {
            socketReceiver.emit("whisper", {
              sender: socket.pseudo,
              message: message,
            });
          }

          var messages = new Messages();
          messages.content = message;
          messages.sender = socket.pseudo;
          messages.receiver = receiver;
          messages.save();
        }
      });
    }
  });

  socket.on("writting", (pseudo) => {
    socket.broadcast.emit("writting", pseudo);
  });

  socket.on("notWritting", () => {
    socket.broadcast.emit("notWritting");
  });

  socket.on("disconnect", () => {
    var index = connectedUsers.indexOf(socket);
    if (index > -1) {
      connectedUsers.splice(index, 1);
    }
    socket.broadcast.emit("quitUser", socket.pseudo);
  });
});
*/

// const server = app.listen(port, () => console.log('server started on port '+ port));