const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const cors = require('cors');


//initialize the app
const app = express();

app.use(bodyParser.json());
app.use(cors());
//json middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

//configuration the static directory
app.use(express.static(path.join(__dirname, 'public')));

//use the passport middleware
app.use(passport.initialize());

//bring in passport strategy
require('./middleware/passport');

//connection to a database
const db = require("./models");
// db.sequelize.sync({ alter: true }).then(() => {
//   console.log("drop and re-sync the database if it contains existing tables");
// })

//bring in the Users route
const users = require('./routes/api/users');
app.use('/api/users', users)

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

//bring in the domaines route
const domaines = require('./routes/api/domaines');
app.use('/api/domaines', domaines)


/***************************************************************************************** chat ***************************************************************************************** */
/*
const http = require("http");
const logger = require("morgan");
const socketio = require("socket.io");

// socket configuration
const WebSockets = require("./utils/WebSockets.js");

// routes
const indexRouter = require("./routes/api/chat/index");
const userRouter = require("./routes/api/chat/user");
const chatRoomRouter = require("./routes/api/chat/chatRoom");
const deleteRouter = require("./routes/api/chat/delete");

app.use(logger("dev"));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

/** Create HTTP server. */
//const server = http.createServer(app);
/** Create socket connection */
/*
global.io = socketio.listen(server);
global.io.on('connection', WebSockets.connection)
*/

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

//start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('server started on port '+ port));
